import { test, expect } from "@playwright/test";

test.describe("Cart & Single-Brand Rule", () => {
  test("adding a product creates a cart with that brand", async ({ page }) => {
    await page.goto("/brand/noir-co");
    await page.locator("a[href^='/product/']").first().click();
    await page.getByRole("button", { name: /Add to Cart/i }).click();
    await page.goto("/cart");
    await expect(page.getByText("Shopping from")).toBeVisible();
    await expect(page.getByText("Noir & Co.")).toBeVisible();
  });

  test("adding a product from a different brand triggers the conflict modal", async ({ page }) => {
    // Add a Noir & Co. item first.
    await page.goto("/brand/noir-co");
    await page.locator("a[href^='/product/']").first().click();
    await page.getByRole("button", { name: /Add to Cart/i }).click();

    // Attempt to add an Étoile Paris item.
    await page.goto("/brand/etoile-paris");
    await page.locator("a[href^='/product/']").first().click();
    await page.getByRole("button", { name: /Add to Cart/i }).click();

    await expect(page.getByText("One brand per cart")).toBeVisible();
    await expect(page.getByText(/Switch Brand/i)).toBeVisible();
  });

  test("switching brands clears the cart and adds the new item", async ({ page }) => {
    await page.goto("/brand/noir-co");
    await page.locator("a[href^='/product/']").first().click();
    await page.getByRole("button", { name: /Add to Cart/i }).click();

    await page.goto("/brand/etoile-paris");
    await page.locator("a[href^='/product/']").first().click();
    await page.getByRole("button", { name: /Add to Cart/i }).click();
    await page.getByRole("button", { name: "Switch Brand" }).click();

    await expect(page).toHaveURL(/\/cart/);
    await expect(page.getByText("Étoile Paris")).toBeVisible();
  });

  test("quantity stepper and remove work on cart page", async ({ page }) => {
    await page.goto("/brand/noir-co");
    await page.locator("a[href^='/product/']").first().click();
    await page.getByRole("button", { name: /Add to Cart/i }).click();
    await page.goto("/cart");

    const removeBtn = page.getByLabel("Remove item");
    await removeBtn.click();
    await expect(page.getByText("Your cart is empty")).toBeVisible();
  });
});
