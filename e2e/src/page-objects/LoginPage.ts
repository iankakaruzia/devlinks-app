import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly createAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole("textbox", { name: "email" });
    this.passwordInput = page.getByRole("textbox", { name: "password" });
    this.submitButton = page.getByRole("button", { name: /login/i });
    this.createAccountLink = page.getByRole("link", {
      name: /create account/i,
    });
  }

  async visit() {
    await this.page.goto("/login");
  }

  async login(username: string, password: string) {
    await this.emailInput.type(username);
    await this.passwordInput.type(password);
    await this.submitButton.click();
  }

  async navigateToCreateAccount() {
    await this.createAccountLink.click();
  }
}
