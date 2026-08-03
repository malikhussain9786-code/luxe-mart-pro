import { test, expect } from "@playwright/test";

test.describe("Admin Dashboard", () => {
  test("dashboard shows live stat cards", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByText("Total Products")).toBeVisible();
    await expect(page.getByText("Total Orders")).toBeVisible();
    await expect(page.getByText("Total Revenue")).toBeVisible();
  });

  test("products table is searchable", async ({ page }) => {
    await page.goto("/admin/products");
    await page.getByPlaceholder(/Search by name, brand, or SKU/i).fill("watch");
    await expect(page.locator("tbody tr").first()).toBeVisible();
  });

  test("inventory page filters by stock status", async ({ page }) => {
    await page.goto("/admin/inventory");
    await page.getByRole("button", { name: "Low Stock" }).click();
    await expect(page.locator("table")).toBeVisible();
  });

  test("analytics page renders charts", async ({ page }) => {
    await page.goto("/admin/analytics");
    await expect(page.getByText("Revenue — Last 7 Days")).toBeVisible();
    await expect(page.getByText("Catalog Split by Category")).toBeVisible();
  });

  test("mobile admin drawer opens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/admin");
    await page.getByLabel("Open admin menu").click();
    await expect(page.getByText("Admin Console")).toBeVisible();
  });
});
