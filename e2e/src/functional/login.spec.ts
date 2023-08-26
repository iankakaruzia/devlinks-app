import test, { expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import { credentials } from "../constants/auth";

test.describe("Login", () => {
  let loginPage: LoginPage;

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.visit();
  });

  test("should navigate to register page", async ({ page }) => {
    await loginPage.navigateToCreateAccount();

    await expect(page).toHaveURL("/register");
  });

  test.skip("should login with valid credentials", async ({ page }) => {
    await loginPage.login(credentials.email, credentials.password);

    await loginPage.wait(2000);

    await expect(page).toHaveURL("/");
  });
});
