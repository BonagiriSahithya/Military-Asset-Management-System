https://military-asset-management-system-six.vercel.app/signup





# Military Asset Management System

The Military Asset Management System is a secure, role-based web app for commanders and logistics officers to track and manage military assets across bases. It features asset tracking, purchases, transfers, assignments, expenditures, detailed logs, and an intuitive dashboard with filters to ensure transparency, security, and accountability.

## Features

- Dashboard displaying key metrics like Opening Balance, Closing Balance, Net Movement, Assigned, and Expended assets.
- Filters by Date, Base, and Equipment Type for refined views.
- Record and view Purchases of assets per base.
- Manage Transfers of assets between bases with complete history.
- Assign assets to personnel and track expenditures.
- Role-Based Access Control (RBAC) with Admin, Base Commander, and Logistics Officer roles.
- Audit logging of all transactions for accountability.

## Technology Stack

- **Frontend:** React.js — responsive and interactive UI.
- **Backend:** Node.js with Express.js — RESTful API server.
- **Database:** Relational (PostgreSQL or MySQL) — ensures data integrity and supports complex asset tracking.
- **Authentication:** JWT and middleware for secure, role-based access control.

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A relational database (PostgreSQL or MySQL)

### Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
````

### Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file in the `backend` directory with necessary environment variables like:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
PORT=5000
```

* Start backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

* The frontend will run on `http://localhost:3000`

## Usage

* Register or login according to your role.
* Admin users have full access to all features.
* Base Commanders and Logistics Officers have restricted views and permissions.
* Use dashboard filters to drill down into asset data.
* Manage purchases, transfers, assignments, and expenditures through dedicated pages.
