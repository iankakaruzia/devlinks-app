import type { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async visit() {
    await this.page.goto("/");
  }
}
