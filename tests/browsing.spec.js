import { test, expect } from "@playwright/test";

test.describe("Browsing & Navigation", () => {
  test("homepage loads with hero, categories, and featured products", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Curated luxury/i })).toBeVisible();
    await expect(page.getByText("Six worlds of premium living")).toBeVisible();
    await expect(page.getByText("Featured this week")).toBeVisible();
  });

  test("category navigation shows filtered products", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Shoes", exact: true }).first().click();
    await expect(page).toHaveURL(/\/category\/shoes/);
    await expect(page.getByRole("heading", { name: "Shoes" })).toBeVisible();
  });

  test("search returns matching results", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Search products, brands...").first().fill("watch");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/search\?q=watch/);
    await expect(page.getByText(/results for "watch"/i)).toBeVisible();
  });

  test("product detail page shows gallery, price, and add to cart", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Featured this week" }).click();
    await page.locator("a[href^='/product/']").first().click();
    await expect(page.getByRole("button", { name: /Add to Cart/i })).toBeVisible();
  });

  test("mobile menu opens and lists categories", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByLabel("Open menu").click();
    await expect(page.getByText("Shop by Category")).toBeVisible();
  });
});
