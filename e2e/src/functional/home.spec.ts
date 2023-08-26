import test, { expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import { credentials } from "../constants/auth";
import { HomePage } from "../page-objects/HomePage";
import { InternalNavbar } from "../page-objects/components/InternalNavbar";

test.describe.skip("Home", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let navbar: InternalNavbar;

  // Before Hook
  test.beforeAll(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.visit();
    await loginPage.login(credentials.email, credentials.password);

    await page.waitForURL("/");
  });

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    navbar = new InternalNavbar(page);

    await homePage.visit();
  });

  test("should go to details page", async ({ page }) => {
    await navbar.clickOnTab("profileDetails");

    await expect(page).toHaveURL("/details");
  });
});
