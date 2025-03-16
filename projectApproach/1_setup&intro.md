# Project Approach: Finance Manager SaaS Web App - BudgetBuddy

## Overview
This project is a Finance Manager Software as a Service (SaaS) web app designed to give users complete control over their financial data. The app features a dynamic dashboard for managing daily transactions, income, and expenses through interactive graphs and detailed data tables.

## Key Features

### User Dashboard
- **Overview of Financial Data:**  
  - View and manage daily transactions, income, and expenses.
  - Interactive graphs that allow switching between different chart types.
  - Filter data by accounts and date ranges for quick insights.

### Transactions Management
- **Detailed Transactions Tab:**  
  - Displays dates, categories, amounts, and accounts in a table format.
  - Features include sorting, searching, and bulk deleting transactions.
- **Adding & Editing Transactions:**  
  - New transactions can be added via a sliding drawer form.
  - Intuitive select components for choosing or creating new accounts and categories.
  - A smart amount component lets users toggle between income and expense types.
  - Ability to rename an account directly from a transaction and remove categories to mark them as uncategorized.
- **CSV Import:**  
  - Import transactions through CSV upload.
  - Editable data table for mapping CSV headers to specific fields with options to skip unnecessary data.
  - Imported data is seamlessly integrated into the transactions tab.

### Bank Account Integration
- **Connecting to Bank Accounts:**  
  - Users can connect their bank accounts (using a service like Plaid) after an upgrade prompt.
  - The process involves selecting a bank, logging in, and choosing which accounts to link.
  - Once connected, the app updates with new transactions, refreshed accounts, and updated categories.
- **Subscription & Upgrade Workflow:**  
  - Upgrade prompts lead to Lemon Squeezy, the payment provider, unlocking additional features.
  - Settings allow users to disconnect their bank or cancel subscriptions, ensuring full control over their data and services.

## Extended Course Content
- **Additional Learning Opportunities:**  
  - Implementing monthly subscriptions and paid plans using Lemon Squeezy.
  - Fetching transactions from bank accounts using dedicated APIs.
  - Access to an extended version of the course with source code and additional content through "Code with Antonio Pro."

## Tech Stack and Tools

### Next.js Setup
- **Project Initialization:**  
  - Created using `bunx create-next-app@latest` (or `npx create-next-app@latest`).
  - Example project name: "Finance tutorial".
  - Configured with TypeScript, Tailwind CSS, and the new App Router.
- **Runtime Choice:**  
  - Uses Bun for its performance improvements over Node.js.
  - Presence of a `bun.lock` file indicates Bun usage; however, Node.js is also supported.

### Component Library Integration
- **Reusable Components:**  
  - A CLI tool is used to set up a collection of reusable components (not a full component library).
  - The CLI installs a default style (Slate color) and uses CSS variables for colors.
  - A new `components` folder is created (initially empty) along with a `lib` folder that contains a utility file for dynamic Tailwind classes.

### Shadcn UI Components
- **Adding UI Elements:**  
  - UI components (like a button) are added using Shadcn UI.
  - The button component is integrated directly into the project, allowing customization of styles and variants.
  - Demonstrates how TypeScript aids in prop validation and offers autocomplete suggestions.

## Project Structure & Development
- **Folder Layout:**  
  - The `app` folder contains the layout and page files that define routing.
  - Other folders include `public` and configuration files.
- **Running the App:**  
  - The development server is started using `bun run dev` (or `npm run dev` if using Node.js), serving the app on localhost:3000.
  - The landing page is rendered as the default route.

## Upcoming Steps
- Build the Landing/Login page.
- Set up authentication.
- Introduce Hono as the library for building the API.
