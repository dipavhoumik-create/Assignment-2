// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  //  add allure + html
  reporter: [
    ['line'], // console reporter
    ['allure-playwright'], // allure results
    ['html', { open: 'never' }], // playwright html reporter
  ],
  use: {
    trace: 'on-first-retry',
    channel: 'chrome', // use installed Google Chrome
    ...devices['Desktop Chrome'], // Always Chrome only
  },
  //chrome brower specific test suites
  projects: [
    {
      name: 'standard-user',
      testMatch: /.*standardUser\.spec\.js/,
    },
    {
      name: 'performance-glitch-user',
      testMatch: /.*performanceGlitchUser\.spec\.js/,
    },
    {
      name: 'locked-out-user',
      testMatch: /.*login\.spec\.js/,
    },
  ],
});
