# AI-Powered Admin Console

A secure, scalable, and intelligent web-based administrative dashboard for small platforms — built with React, Node.js, Express, and MongoDB Atlas.

---

## Overview

Managing users, monitoring system performance, and ensuring data security are critical responsibilities for platform administrators. The **AI-Powered Admin Console** provides a centralized solution that brings together real-time analytics, user management, activity monitoring, and AI-driven anomaly detection — all in one clean, modern interface.

---

## Features

- 🔐 **Secure Authentication** — JWT-based login with bcrypt password hashing
- 👥 **Role-Based Access Control** — Separate admin and user roles with protected routes
- 📊 **Interactive Dashboard** — Live stats, charts, and activity feeds powered by Recharts
- 🔍 **Activity Monitoring** — Tracks user actions, login history, IP addresses, and device info
- 🤖 **AI Anomaly Detection** — Detects suspicious login patterns and unusual behavior
- 🚨 **Real-Time Alerts** — Notifies admins about security threats and system anomalies
- 🛒 **E-Commerce Management** — Products, orders, and customer management
- 📦 **Inventory Tracking** — Stock levels, suppliers, and warehouse data
- 💳 **Transaction Management** — Payments, refunds, and financial records
- 📅 **Calendar** — Events, deadlines, and meeting scheduling
- 💬 **Messaging** — Admin inbox and conversation management
- 📈 **Analytics** — Traffic, conversions, revenue reports, and AI-powered insights
- 🌙 **Dark Mode** — Full dark/light theme toggle
- 🤖 **Gemini AI Copilot** — Built-in AI assistant with access to dashboard data

---

## 🧰 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js, JavaScript, Tailwind CSS  |
| Charts     | Recharts                            |
| Routing    | React Router DOM                    |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB Atlas                       |
| Auth       | JWT, bcrypt.js                      |
| AI Copilot | Google Gemini API                   |
| Dev Tools  | VS Code, Git, GitHub, Postman       |

---

## 🗂️ Project Structure

```
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/    # StatsGrid, ChartSection, TableSection, ActivityFeed
│   │   │   ├── Layout/       # AdminLayout, Sidebar, Header
│   │   │   └── GeminiCopilot.jsx
│   │   ├── pages/
│   │   │   ├── analytics/    # Overview, Reports, Insights
│   │   │   ├── ecommerce/    # Products, Orders, Customers
│   │   │   ├── users/        # AllUsers, RolesPage, UserActivity
│   │   │   ├── Login.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Transactions.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── CalendarPage.jsx
│   │   │   └── Reports.jsx
│   │   ├── utils/
│   │   │   └── anomalyDetector.js
│   │   └── App.jsx
│
├── server/                   # Node.js backend
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── roleRoutes.js
│   │   ├── inventory.js
│   │   ├── transactions.js
│   │   ├── messages.js
│   │   ├── events.js
│   │   ├── reports.js
│   │   └── gemini.js
│   └── server.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB Atlas account
- Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-admin-console.git
cd ai-admin-console
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd client
npm install
npm start
```

The app will run at `http://localhost:3000`.

---

## 🔑 Authentication Flow

1. Admin logs in via `/login`
2. Server validates credentials and returns a JWT token
3. Token is stored in `localStorage`
4. All protected routes check for a valid token before rendering

---

## 🤖 AI Anomaly Detection

The `anomalyDetector.js` utility analyzes the activity log to assign risk scores to users. It flags behaviors such as:

- Multiple failed login attempts
- Logins from unusual devices or IP addresses
- Actions outside normal hours
- Rapid consecutive session activity

Risk levels are categorized as **High**, **Medium**, or **Low**, and displayed in the `AnomalyPanel` component.

---

## 📸 Screenshots

> _Add your screenshots here_

| Dashboard | Analytics | User Management |
|-----------|-----------|-----------------|
| ![dashboard](#) | ![analytics](#) | ![users](#) |

---

## 🛣️ Roadmap

- [ ] Two-Factor Authentication (2FA)
- [ ] Email/SMS real-time alert notifications
- [ ] Export reports to PDF / Excel
- [ ] Advanced AI analytics with trend prediction
- [ ] Mobile-responsive improvements

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
git checkout -b feature/your-feature-name
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

Then open a Pull Request.


## 👩‍💻 Author

**Tannvi**  
Built as part of a third year project — *AI-Powered Admin Console *

---

> _"Empowering administrators with intelligent, real-time platform insights."_

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
