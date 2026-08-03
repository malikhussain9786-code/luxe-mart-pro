import { test, expect } from "@playwright/test";

test.describe("Receipts", () => {
  test("receipt page shows itemized totals and download button", async ({ page }) => {
    await page.goto("/brand/noir-co");
    await page.locator("a[href^='/product/']").first().click();
    await page.getByRole("button", { name: /Add to Cart/i }).click();
    await page.goto("/cart");
    await page.getByRole("button", { name: /Proceed to Checkout/i }).click();

    await page.getByPlaceholder("Malik Ahmed").fill("Test Shopper");
    await page.getByPlaceholder("+92 300 1234567").fill("+92 300 0000000");
    await page.getByPlaceholder("you@example.com").fill("test@example.com");
    await page.locator("select").first().selectOption({ label: "Pakistan" });
    await page.locator("select").nth(1).selectOption({ index: 1 });
    await page.getByPlaceholder("e.g. Main Boulevard").fill("Main Blvd");
    await page.getByPlaceholder("e.g. House 24-B").fill("House 1");
    await page.getByRole("button", { name: /Continue to Payment/i }).click();

    await page.getByPlaceholder("1234 5678 9012 3456").fill("4111111111111111");
    await page.getByPlaceholder("As shown on card").fill("Test Shopper");
    await page.getByPlaceholder("MM/YY").fill("12/28");
    await page.getByPlaceholder("123").fill("123");
    await page.getByRole("button", { name: /Review Order/i }).click();
    await page.getByRole("button", { name: /Place Order/i }).click();
    await expect(page.getByText(/Thank you/i)).toBeVisible({ timeout: 5000 });

    await page.getByRole("link", { name: "View Receipt" }).click();
    await expect(page.getByText("Bill To")).toBeVisible();
    await expect(page.getByText("Total Paid")).toBeVisible();
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible();
  });
});
