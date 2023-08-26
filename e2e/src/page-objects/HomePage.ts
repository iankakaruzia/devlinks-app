import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButton = page.getByRole("button", { name: /logout/i });
  }

  async logout() {
    await this.logoutButton.click();
  }
}
