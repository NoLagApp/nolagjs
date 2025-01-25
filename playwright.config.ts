import { defineConfig, devices, PlaywrightTestConfig } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
  globalSetup: "./examples/e2e/playwrightGlobalSetup",
  globalTeardown: "./examples/e2e/playwrightGlobalTeardown",
  testDir: "./examples/e2e/playwright", // Directory where your test files are located
  testMatch: "**/*.playtest.ts", // Only include files with "playtest" in their name
  timeout: 30000, // Set timeout for each test
  expect: {
    timeout: 5000, // Timeout for expect assertions
  },
  workers: 1, // Run tests in a single worker
  fullyParallel: false, // Prevent parallel execution of tests
  use: {
    headless: true, // Run tests in headless mode
    baseURL: "http://localhost:3000", // Base URL for your app
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        browserName: "chromium",
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     browserName: 'webkit',
    //     viewport: { width: 375, height: 812 }, // iPhone X dimensions
    //   },
    // },
  ],
});
