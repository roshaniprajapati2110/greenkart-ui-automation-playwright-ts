# GreenKart UI Automation with Playwright & TypeScript

This repository contains an end-to-end UI automation test suite for the GreenKart application, built using [Playwright](https://playwright.dev/) with **TypeScript**. The framework follows the **Page Object Model (POM)** design pattern and is structured for scalability, readability, and maintainability.

---

## Tech Stack

-  Playwright
-  TypeScript
-  Node.js
-  Page Object Model (POM)
-  VS Code

---

## Project Structure

greenkart-ui-automation-playwright-ts/
├── .github/workflows/           # GitHub Actions CI configuration  
│   └── playwright.yml  
├── DataFactory/                 # Dynamic test data generators  
├── DTOs/                        # Data Transfer Objects (interfaces/classes for test data)  
├── PageObjects/                 # Page Object classes  
│   ├── HomePagePO.ts  
│   ├── CheckOutPO.ts  
│   └── CountryPO.ts  
├── tests/                       # Test specs  
│   ├── AddToCart.spec.ts  
│   ├── CheckOutPage.spec.ts  
│   ├── CountryPage.spec.ts  
│   └── HomePage.spec.ts  
├── Utilities/                   # Reusable utility functions (e.g., logger, config)  
│   └── Logger.ts  
├── playwright.config.ts         # Playwright configuration  
├── package.json                 # Node dependencies and scripts  
├── tsconfig.json                # TypeScript configuration  
├── .gitignore                   # Files/folders to ignore in Git  
└── README.md                    # Project documentation



▶️ Run All Tests
``` npx playwright test ```

▶️ Run Specific Test
``` npx playwright test tests/AddToCart.spec.ts ```

▶️ Test Runner UI
``` npx playwright test --ui ```

## Features Implemented
- Page Object Model (POM) for cleaner test code
- Data Factory & DTO pattern for test data handling
- Logger utility
- Scalable test structure
- GitHub Actions CI support via .github/workflows/playwright.yml

Author
Roshani Prajapati
QA Automation Engineer | Passionate about Clean Code & Quality

