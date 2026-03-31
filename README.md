# Suxnix - Health & Wellness Supplements Marketplace

Suxnix is a comprehensive e-commerce platform for Health & Wellness Supplements. This repository contains the source code for the Suxnix web application, including a robust frontend built with React and Vite, and a secure backend powered by Express and MongoDB.

## 🚀 Tech Stack

### Frontend

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS + custom Suxnix theme colors (`#faa432`, `#0d9b4d`)
- **UI Components:** Radix UI / shadcn/ui
- **State Management:** Redux Toolkit (`react-redux`)
- **Routing:** React Router DOM
- **Forms & Validation:** React Hook Form + Zod
- **Icons & Notifications:** Lucide React, Sonner (Toasts)

### Backend

- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) + bcrypt

## ✨ Core Features

### 👤 Profile Management

- Comprehensive user profile dashboard.
- **Editable Information:** First Name, Last Name, Phone Number, Gender, Date of Birth, and Biography.
- **Security:** Immutable email addresses and password exclusion from standard profile payloads.
- **User Experience:** Inline validation with Zod, edit/view toggle mode, responsive profile avatars.

### 📍 Address Management

- Fully featured multi-address address book.
- **Address Types:** Organize via categories (Home, Office, Other).
- **Default Address:** Effortless tagging of a primary default address.
- **CRUD Operations:** Add, view, edit, and delete addresses efficiently.
- **Validation:** Stringent address structure validation to ensure accurate deliveries.
- **Interface:** Responsive address cards with intelligent color-coding based on type.

## 🛠 Project Structure

```text
/
├── public/                 # Static assets
├── server/                 # Backend Node/Express code
│   ├── controllers/        # Business logic (e.g., user & address controllers)
│   ├── models/             # Mongoose schemas (User, Address)
│   └── routes/             # API endpoints
├── src/                    # Frontend React code
│   ├── pages/              # Main application views (Profile, Addresses, etc.)
│   ├── Store/              # Redux setup (slices, API integration)
│   └── App.jsx             # Main router and layout
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 🏁 Quick Start & Installation

### Prerequisites

Make sure you have Node.js (v18+) and npm installed on your machine. You will also need access to a running MongoDB database.

### 1. Clone & Install

Clone the repository and install all dependencies:

```bash
npm install
```

### 2. Environment Setup

You'll need to set up your environment variables. Ensure the following variables are appropriately set in your backend `.env` file (or system environment):

- `JWT_SECRET_KEY`: Your secure secret for generating JWT tokens.
- `MONGODB_URI`: Your MongoDB connection string.

### 3. Start the Development Server

Run the following command to start both the Vite development server and backend server (if concurrently configured), or start the frontend server:

```bash
npm run dev
```

Visit the local application in your browser (typically `http://localhost:5173`).

## 📡 Key API Endpoints

All protected endpoints require authentication via `authMiddleware`.

### Profile

- `GET /auth/users/profile` : Fetch authenticated user's profile
- `PUT /auth/users/profile` : Update user's profile information

### Addresses

- `GET /auth/users/addresses` : Fetch all user addresses
- `POST /auth/users/addresses` : Add a new address
- `PUT /auth/users/addresses/:id` : Update an existing address
- `DELETE /auth/users/addresses/:id` : Remove an address
- `PATCH /auth/users/addresses/:id/set-default` : Set an address as default

## 🛡️ Security & Validations

- **Frontend Validation:** Robust client-side validation using Zod prevents malformed data before hitting the API.
- **Authorization:** Only address owners can modify or delete their respective address records. Protected API endpoints secure user data.
- **Error Handling:** Graceful API and client-side error handling displaying actionable toast notifications.

## 💻 Development Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to catch issues
- `npm run format` - Format code with Prettier
- `npm run preview` - Preview the production build locally
