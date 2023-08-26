import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole("textbox", { name: "email" });
    this.passwordInput = page.getByRole("textbox", { name: "password" });
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "confirmPassword",
    });
    this.submitButton = page.getByRole("button", {
      name: /create new account/i,
    });
    this.loginLink = page.getByRole("link", {
      name: /login/i,
    });
  }

  async visit() {
    await this.page.goto("/register");
  }

  async register(username: string, password: string, confirmPassword: string) {
    await this.emailInput.type(username);
    await this.passwordInput.type(password);
    await this.confirmPasswordInput.type(confirmPassword);
    await this.submitButton.click();
  }

  async navigateToLogin() {
    await this.loginLink.click();
  }
}
