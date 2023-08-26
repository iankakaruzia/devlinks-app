export const credentials = {
  email: process.env.E2E_TEST_EMAIL || "",
  password: process.env.E2E_TEST_PASSWORD || "",
  verificationCode: process.env.E2E_TEST_VERIFICATION_CODE || "",
} as const;
