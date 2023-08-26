import { expect, type Locator, type Page } from "@playwright/test";

export class InternalNavbar {
  readonly page: Page;
  readonly links: Locator;
  readonly profileDetails: Locator;
  readonly preview: Locator;
  readonly logoutEl: Locator;

  constructor(page: Page) {
    this.page = page;
    this.links = page.getByTestId("links");
    this.profileDetails = page.getByTestId("profile");
    this.preview = page.getByTestId("preview");
    this.logoutEl = page.getByTestId("logout");
  }

  async clickOnTab(tabName: "links" | "profileDetails") {
    switch (tabName) {
      case "links":
        await this.links.click();
        break;
      case "profileDetails":
        await this.profileDetails.click();
        break;
      default:
        throw new Error("This tab does not exist..");
    }
  }

  async logout() {
    await this.logoutEl.click();
  }

  async goToPreview() {
    await this.preview.click();
  }

  async isVisible() {
    await expect(this.links).toBeVisible();
  }
}
