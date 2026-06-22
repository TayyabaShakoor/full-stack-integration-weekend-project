# 🛍️ Full-Stack Integration Project

## User Profile & Order Management System

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 Overview

This is a **Full-Stack Integration Project** that demonstrates a complete **User Profile & Order Management** flow. The application transitions from a static frontend to a dynamic, state-driven platform with JWT authentication, protected routes, and optimistic UI updates.

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ JWT (JSON Web Token) authentication
- ✅ Secure token storage in localStorage
- ✅ Auto-logout on token expiry
- ✅ Protected routes with AuthGuard

### 📡 API Integration
- ✅ Real data from DummyJSON API
- ✅ Products, Profile, Orders fetching
- ✅ Axios interceptors for token management
- ✅ Comprehensive error handling

### ⚡ Optimistic UI
- ✅ Instant cart updates before server response
- ✅ Automatic rollback on failure
- ✅ Visual feedback for optimistic items

### 🎨 User Interface
- ✅ Modern glass-morphism design
- ✅ Smooth animations with Framer Motion
- ✅ Toast notifications
- ✅ Fully responsive
- ✅ Loading states

### 📱 Pages
- Login Page
- Dashboard (Products + Cart)
- Profile Page
- Orders Page

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **React Router v6** | Routing & navigation |
| **Context API** | State management |
| **Axios** | API calls & interceptors |
| **JWT** | Authentication |
| **Framer Motion** | Animations |
| **React Hot Toast** | Notifications |
| **Custom CSS** | Styling |

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/full-stack-integration-weekend-project.git

# Navigate to project
cd full-stack-integration-project

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_BASE_URL=https://dummyjson.com" > .env

# Start development server
npm start
