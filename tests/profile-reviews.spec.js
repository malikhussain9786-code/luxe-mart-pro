import { test, expect } from "@playwright/test";

test.describe("Wishlist, Profile & Reviews", () => {
  test("wishlist toggle adds and removes a product", async ({ page }) => {
    await page.goto("/");
    await page.locator("a[href^='/product/']").first().click();
    await page.locator("button[aria-label='Toggle wishlist']").click();
    await page.goto("/wishlist");
    await expect(page.getByText(/1 item saved/i)).toBeVisible();
  });

  test("profile personal info form saves", async ({ page }) => {
    await page.goto("/profile");
    await page.getByPlaceholder("Your full name").fill("Test User");
    await page.getByPlaceholder("you@example.com").fill("testuser@example.com");
    await page.getByRole("button", { name: "Save Changes" }).click();
    await expect(page.getByRole("button", { name: /Saved/i })).toBeVisible();
  });

  test("profile address tab adds a saved address", async ({ page }) => {
    await page.goto("/profile");
    await page.getByRole("button", { name: "Saved Addresses" }).click();
    await page.getByRole("button", { name: "Add Address" }).click();
    await page.locator("select").first().selectOption({ label: "United Arab Emirates" });
    await page.locator("select").nth(1).selectOption({ index: 1 });
    await page.getByPlaceholder("e.g. Main Boulevard").fill("Test Street");
    await page.getByPlaceholder("e.g. House 24-B").fill("House 9");
    await page.getByRole("button", { name: "Save Address" }).click();
    await expect(page.getByText("Test Street")).toBeVisible();
  });

  test("product review form submits and appears in list", async ({ page }) => {
    await page.goto("/");
    await page.locator("a[href^='/product/']").first().click();
    await page.getByRole("button", { name: "Write a Review" }).click();
    await page.locator("button[aria-label='Rate 5 stars']").click();
    await page.getByPlaceholder(/Share your experience/i).fill("Fantastic quality, exceeded expectations.");
    await page.getByRole("button", { name: "Submit Review" }).click();
    await expect(page.getByText(/your review has been posted/i)).toBeVisible();
    await expect(page.getByText("Fantastic quality, exceeded expectations.")).toBeVisible();
  });
});
