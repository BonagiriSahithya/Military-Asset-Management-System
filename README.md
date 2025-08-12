---

# Military Asset Management System

A **secure, role-based full-stack web application** for tracking and managing critical military assets — such as vehicles, weapons, and ammunition — across multiple bases.
The system ensures **accountability**, **operational transparency**, and **streamlined logistics** for the armed forces.

---

## 📌 Key Features

* **📦 Asset Tracking** – Monitor Opening & Closing Balances, Net Movement (Purchases + Transfers In – Transfers Out).
* **🛒 Purchases** – Record procurement transactions with full audit logs.
* **🔄 Transfers** – Move assets between bases with secure approvals.
* **🎯 Assignments** – Allocate assets to specific personnel or units.
* **💥 Expenditures** – Log usage/consumption of ammunition, fuel, or other expendable items.
* **🛡 Role-Based Access Control (RBAC)** –

  * **Admin**: Full access to all modules.
  * **Base Commander**: Restricted to their base's data.
  * **Logistics Officer**: Can manage purchases and transfers only.
* **📊 Dashboard & Reports** – Interactive dashboard with date/base/equipment type filters and drill-down reports.
* **🔒 Secure JWT Authentication** – Role-aware protected routes and auto token refresh.
* **📝 Audit Logs** – Every action is stored for compliance & traceability.

---

## 🛠 Tech Stack

| Layer          | Technology & Purpose                                  |
| -------------- | ----------------------------------------------------- |
| **Frontend**   | React.js – Responsive and dynamic UI                  |
| **API Client** | Axios – With JWT interceptors for auto-authentication |
| **Backend**    | Node.js + Express – RESTful API                       |
| **Database**   | MongoDB – Flexible schema for transaction logs        |
| **Security**   | JWT + RBAC Middleware                                 |
| **Logging**    | AuditLogs collection for all transactions             |

---

## 📂 Project Structure

```
Military-Asset-Management-System/
├── backend/
│   ├── routes/          # API route handlers
│   ├── middleware/      # Auth & RBAC
│   ├── models/          # MongoDB schemas
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Feature pages
│   │   └── App.jsx      # Main React app
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

* Node.js (v16+)
* MongoDB (local or Atlas)
* npm or yarn

### 2️⃣ Install

**Backend**

```bash
cd backend
npm install
cp .env.example .env   # Add MONGO_URI, JWT_SECRET, PORT
npm start
```

**Frontend**

```bash
cd ../frontend
npm install
npm start
```

---

## 🔗 API Overview

| Method | Endpoint            | Role Access       | Description           |
| ------ | ------------------- | ----------------- | --------------------- |
| POST   | `/api/auth/login`   | Public            | Login & get JWT       |
| GET    | `/api/dashboard`    | All authenticated | Fetch summary metrics |
| POST   | `/api/purchases`    | Admin, Logistics  | Create purchase       |
| POST   | `/api/transfers`    | Admin, Logistics  | Transfer assets       |
| POST   | `/api/assignments`  | Admin, Commander  | Assign assets         |
| POST   | `/api/expenditures` | Admin, Commander  | Log usage             |

---

