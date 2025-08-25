# Rewards Program App

This is a simple React application that tracks customer transactions and calculates reward points. It demonstrates how to fetch and display transaction data in tables, and how to calculate monthly and total rewards for each customer.

---

## 📂 Project Structure

my-app/
├── db.json # Mock database (JSON server)
├── src/
│ ├── App.js # Main app component
│ ├── index.js # Entry point
│ ├── components/
│ │ ├── TransactionsTable.js # Table for transactions
│ │ ├── RewardsTable.js # Table for rewards
│ │ └── Loader.js # Loading spinner
│ ├── services/
│ │ └── api.js # API service to fetch transactions
└── README.md

yaml
Copy
Edit

---

## 🚀 Features

- Fetches transaction data from a local **JSON server**.
- Displays transactions in a clean table.
- Calculates reward points based on:
  - **2 points per dollar** spent over $100.
  - **1 point per dollar** spent between $50–100.
- Shows monthly and total rewards per customer.
- Includes **loading** and **error handling** states.
- Unit tests with **React Testing Library** + **Jest**.

---

## ⚙️ Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/rewards-app.git
cd rewards-app
Install dependencies:

bash
Copy
Edit
npm install
Start JSON server (mock API):

bash
Copy
Edit
npx json-server --watch db.json --port 5000
Start React app:

bash
Copy
Edit
npm start
The app will be available at 👉 http://localhost:3000
The mock API will run at 👉 http://localhost:5000/transactions

🧪 Running Tests
Run unit tests with:

bash
Copy
Edit
npm test
Tests cover:

Rendering the main app.

Transaction table rendering.

Rewards calculation and rendering.

🧮 Reward Points Calculation
The reward points are calculated as follows:

For every dollar spent over $100 → 2 points.

For every dollar spent between $50–100 → 1 point.

Below $50 → 0 points.

Example:
Transaction of $120 → (50 × 1) + (20 × 2) = 90 points.

Transaction of $75 → (25 × 1) = 25 points.

📸 UI Preview
Transactions Table:
Shows all transactions by customer.

Rewards Table:
Displays reward points earned by each customer, monthly + total.

🛠️ Tech Stack
React 18

Bootstrap 5 (basic styling)

Jest + React Testing Library (unit testing)

JSON Server (mock backend API)
```
