# SpendWise

A modern, browser-based personal expense tracker built with React and TypeScript.

SpendWise helps users record expenses, manage monthly budgets, understand spending patterns, and monitor their financial position through an interactive dashboard.

## ✨ Features

### Dashboard

- Monthly spending overview
- Total spending, transaction count, and average expense
- Remaining monthly budget and budget utilization
- Daily, weekly, and monthly spending views
- Spending-by-category donut chart
- Spending insights based on actual expense data
- Recent transactions
- Six months of seeded demo data for testing

### Expense Management

- Add expenses
- Edit expenses
- Delete expenses with confirmation
- Search expenses
- Filter by category and month
- Sort by date, amount, or title
- Responsive expense presentation

### Budget Management

- Monthly budget tracking
- Budget utilization progress
- Remaining-budget calculation
- Over-budget state handling
- Budget editing

### Persistence

- Runs entirely in the browser
- No backend required
- Expense and budget data are persisted with `localStorage`
- Seed data is added only when no existing expense data is available

### Responsive UX

Designed to work across:

- Desktop
- Tablet
- Mobile
- Narrow screens down to approximately 320px

The application uses a fixed navigation/header structure while the main dashboard content remains scrollable.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | UI framework |
| TypeScript | Type-safe development |
| Vite | Development server and build tool |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| Recharts | Data visualization |
| Vitest | Unit testing |
| ESLint | Code quality |

The application is fully client-side and does not require an API, database, authentication service, or backend.

---

## 📁 Project Structure

```text
spendwise/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── expenses/
│   │   └── common/
│   │
│   ├── context/
│   │   └── FinanceContext.tsx
│   │
│   ├── data/
│   │   └── seedData.ts
│   │
│   ├── hooks/
│   │   ├── useExpenses.ts
│   │   ├── useBudget.ts
│   │   ├── useLocalStorage.ts
│   │   └── useDashboardData.ts
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   └── Expenses.tsx
│   │
│   ├── types/
│   │   └── finance.types.ts
│   │
│   ├── utils/
│   │   ├── expenseUtils.ts
│   │   ├── budgetUtils.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── tests/
│   ├── expenseUtils.test.ts
│   └── budgetUtils.test.ts
│
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

The exact file set may evolve as the application grows, but business logic should remain separated from presentation components.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js 18+
- npm 9+

Check your versions:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd spendwise
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Preview Production Build

```bash
npm run preview
```

Serves the generated production build locally.

### Tests

```bash
npm run test
```

Runs the unit test suite.

### Lint

```bash
npm run lint
```

Runs ESLint checks across the project.

---

## 💾 Data & Storage

SpendWise is currently a client-side application.

### Local Storage

The application stores:

- Expenses
- Monthly budgets

in the browser's `localStorage`.

No information is sent to a server.

### Seed Data

A fresh installation includes demo data covering:

- March 2026
- April 2026
- May 2026
- June 2026
- July 2026
- August 2026

This makes it possible to test:

- Month switching
- Spending trends
- Budget comparisons
- Category breakdowns
- Monthly chart views

Existing local storage is never overwritten by the seed data.

---

## 📊 Dashboard Views

The Spending Over Time visualization supports:

### Daily

Shows spending by individual day within the selected month.

### Weekly

Aggregates spending into weeks within the selected month.

### Monthly

Compares spending across the six-month demo history.

Changing the selected month updates the dashboard consistently, including:

- Spending total
- Transactions
- Average expense
- Category breakdown
- Budget
- Budget utilization
- Spending chart
- Spending insights
- Recent transactions

---

## 🧮 Expense Model

Expenses use the following conceptual structure:

```ts
interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  notes?: string;
}
```

Supported categories:

```text
Food
Transport
Shopping
Bills
Entertainment
Health
Travel
Other
```

---

## 🏗️ Architecture

SpendWise separates the application into several layers.

### Components

Responsible primarily for rendering the UI and handling user interaction.

### Hooks

Contain reusable stateful behavior and derived dashboard data.

### Context

Provides shared finance state and operations.

### Utilities

Contain pure business logic such as:

- expense filtering
- totals
- averages
- category aggregation
- budget calculations
- date formatting
- chart data preparation

### Seed Data

Provides deterministic demo expenses and monthly budgets for local development.

This separation keeps business logic out of presentation components and makes the core calculations easier to test.

---

## 🧪 Testing Strategy

Unit tests focus on business-critical calculations rather than visual implementation.

Important areas include:

- expense totals
- average expense calculations
- filtering
- sorting
- category aggregation
- daily aggregation
- weekly aggregation
- monthly aggregation
- budget percentages
- remaining budget
- over-budget states
- month comparisons
- empty-data handling

Run the full verification suite with:

```bash
npm run lint
npm run test
npm run build
```

---

## 🎨 Design Principles

SpendWise follows a restrained fintech/SaaS visual language:

- Light content canvas
- Dark navy navigation
- Blue/indigo primary accent
- Emerald for positive budget states
- Amber for warnings
- Rose/red for exceeded budgets
- Minimal shadows
- Subtle borders
- Strong typography hierarchy
- Responsive layouts
- Accessible interactions

The design prioritizes:

**Summary → Budget → Analytics → Transactions**

so users can quickly understand their financial position before exploring details.

---

## 🔐 Privacy

SpendWise currently does not use:

- Authentication
- Backend services
- Third-party financial APIs
- Banking integrations
- Cloud databases

All expense data remains in the browser's local storage.

Because of this, clearing the browser's site storage will remove locally stored application data.

---

## 🔮 Future Enhancements

Potential future capabilities include:

- Category-level budgets
- Recurring expenses
- Financial savings goals
- Monthly spending forecasts
- Month-over-month comparison mode
- CSV import/export
- PDF financial reports
- Receipt attachments
- Financial calendar
- Upcoming recurring payments
- Natural-language expense entry
- Natural-language expense search
- Optional cloud synchronization
- User authentication
- Multi-device data synchronization

---

## 🤝 Contributing

Contributions and improvements are welcome.

Suggested workflow:

```bash
git checkout -b feature/your-feature
```

Make your changes, then run:

```bash
npm run lint
npm run test
npm run build
```

Commit your changes:

```bash
git add .
git commit -m "Add your change"
```

Push the branch:

```bash
git push origin feature/your-feature
```

Then open a pull request.

---

## 📄 License

This project is currently intended for personal learning, experimentation, and portfolio use.

Add an appropriate open-source license here if the repository is later published under one.

---

## 📌 Project Status

**Status: Active Development**

SpendWise is currently a client-side demonstration application focused on expense tracking, budgeting, data visualization, and polished dashboard UX.
