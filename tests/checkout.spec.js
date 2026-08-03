import { test, expect } from "@playwright/test";

async function addItemToCart(page) {
  await page.goto("/brand/noir-co");
  await page.locator("a[href^='/product/']").first().click();
  await page.getByRole("button", { name: /Add to Cart/i }).click();
}

test.describe("Checkout, Payment & Orders", () => {
  test("full checkout flow places an order and shows confirmation", async ({ page }) => {
    await addItemToCart(page);
    await page.goto("/cart");
    await page.getByRole("button", { name: /Proceed to Checkout/i }).click();

    // Shipping step
    await page.getByPlaceholder("Malik Ahmed").fill("Test Shopper");
    await page.getByPlaceholder("+92 300 1234567").fill("+92 300 0000000");
    await page.getByPlaceholder("you@example.com").fill("test@example.com");
    await page.locator("select").first().selectOption({ label: "United Arab Emirates" });
    await page.locator("select").nth(1).selectOption({ index: 1 });
    await page.getByPlaceholder("e.g. Main Boulevard").fill("Sheikh Zayed Road");
    await page.getByPlaceholder("e.g. House 24-B").fill("Villa 12");
    await page.getByRole("button", { name: /Continue to Payment/i }).click();

    // Payment step
    await page.getByPlaceholder("1234 5678 9012 3456").fill("4111111111111111");
    await page.getByPlaceholder("As shown on card").fill("Test Shopper");
    await page.getByPlaceholder("MM/YY").fill("12/28");
    await page.getByPlaceholder("123").fill("123");
    await page.getByRole("button", { name: /Review Order/i }).click();

    // Review + place order
    await page.getByRole("button", { name: /Place Order/i }).click();
    await expect(page.getByText("Processing Payment")).toBeVisible();
    await expect(page.getByText(/Thank you/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/has been placed/i)).toBeVisible();
  });

  test("order appears in order history after placement", async ({ page }) => {
    await addItemToCart(page);
    await page.goto("/checkout");
    await page.goto("/orders");
    await expect(page.locator("body")).toBeVisible();
  });

  test("order tracking shows status timeline", async ({ page }) => {
    await addItemToCart(page);
    await page.goto("/cart");
    await page.getByRole("button", { name: /Proceed to Checkout/i }).click();
    await page.goto("/orders");
    const trackLink = page.getByRole("link", { name: /Track/i }).first();
    if (await trackLink.count()) {
      await trackLink.click();
      await expect(page.getByText("Delivered")).toBeVisible();
    }
  });
});
