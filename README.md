# Stockfolio — MERN Stack Stock Portfolio Tracker

A full-stack portfolio tracker built with MongoDB, Express, React (Vite) and Node.js.
Clean, minimal UI inspired by Zerodha / Groww, with dark mode, live-updating (mock)
prices, portfolio CRUD, watchlist, transactions, and analytics.

## What's included

- **Backend**: Express REST API, JWT auth (register/login/forgot-reset password),
  bcrypt password hashing, Mongoose models (User, Portfolio, Transaction, Watchlist),
  Helmet + rate limiting + CORS, centralized error handling.
- **Frontend**: React 19 + Vite + Tailwind, React Router, React Query, Axios,
  Recharts (pie/bar/line charts), Framer Motion, React Hot Toast, React Icons,
  dark mode toggle, responsive sidebar layout.
- **Market data**: a self-contained mock price generator (`backend/utils/mockMarketData.js`)
  so the whole app runs with zero external API keys. Prices drift slightly every
  minute so the UI feels live. Swap this file for a real provider (Alpha Vantage,
  Finnhub, Twelve Data) when you're ready — the rest of the app doesn't need to change.

## What's simplified / left as an exercise

To keep this runnable out of the box without paid services:
- **News page** uses placeholder headlines — wire up a real news API when ready.
- **Profile updates** are client-side only — add a `PUT /api/auth/me` route to persist them.
- **Cloudinary / Socket.io / Redis** were listed as optional in the brief and are not
  wired in, since they need external accounts. The architecture (service layer,
  controllers) makes them straightforward to add later.
- **Deployment configs** (Docker, CI) aren't included — see the deployment notes below
  for the quickest path with Render/Vercel/Atlas.

## Project structure

```
stockfolio/
├── backend/
│   ├── config/db.js
│   ├── controllers/        # auth, portfolio, watchlist, transaction, market, analytics
│   ├── middleware/         # auth (JWT), errorHandler
│   ├── models/             # User, Portfolio, Transaction, Watchlist
│   ├── routes/
│   ├── utils/              # generateToken, mockMarketData
│   └── server.js
└── frontend/
    └── src/
        ├── components/     # Navbar, Sidebar, Card, Button, Modal, ProtectedRoute, Loader
        ├── context/         # AuthContext, ThemeContext
        ├── layouts/         # DashboardLayout
        ├── pages/           # Landing, Login, Register, Dashboard, Portfolio, Watchlist,
        │                    # Transactions, Analytics, Market, News, Profile, Settings
        └── services/        # api.js, authService, portfolioService, marketService
```

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally, or a free MongoDB Atlas cluster

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI and a long random JWT_SECRET
npm run dev
```

The API starts on `http://localhost:5000`. Check `http://localhost:5000/api/health`
to confirm it's running.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on `http://localhost:5173`. The Vite dev server proxies `/api`
requests to `http://localhost:5000`, so no extra config is needed.

### 3. Try it out

1. Open `http://localhost:5173`, click **Register**, create an account.
2. Go to **Portfolio → Add Stock** and add a holding (e.g. ticker `TCS`, company
   "Tata Consultancy Services", quantity 10, buy price 3500).
3. Visit **Dashboard** and **Analytics** to see charts populate from your data.
4. Toggle dark mode from the navbar or Settings page.

## Available tickers (mock data)

`RELI, TCS, HDFB, INFY, ICIB, SBIN, BHRT, ITCL, LNTC, WIPRO, MARU, SUNP`
(use these in Add Stock / Watchlist so prices resolve — any other ticker
still works but shows the buy price as the current price)

## Deployment (quick path)

- **Database**: MongoDB Atlas (free tier) — use its connection string as `MONGO_URI`.
- **Backend**: Render or Railway — set the same env vars from `.env.example`.
- **Frontend**: Vercel or Netlify — set `VITE_API_URL` if you move off the Vite
  proxy, and point Axios's `baseURL` at your deployed backend URL.

## Security notes

- Passwords are hashed with bcrypt, never stored in plaintext.
- JWTs are signed with a secret you control — use a long, random `JWT_SECRET` in production.
- Helmet sets sensible security headers; `express-rate-limit` throttles the API.
- Add HTTPS termination (via your host) before deploying publicly.


 ## Technology Stack:
- React + Vite
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Tailwind CSS
- Axios
- React Router
- Chart.js or Recharts


-----------------------------------
 ## MAIN FEATURES
-----------------------------------

1. Landing Page

Include

- Hero section
- Project description
- Features cards
- Screenshot preview
- "Get Started" button
- Footer

-----------------------------------

2. Authentication

- Register
- Login
- JWT Authentication
- Logout

Store user information in MongoDB.

-----------------------------------

3. Dashboard

After login show

Welcome User

Portfolio Summary Cards

Total Investment

Current Value

Today's Profit/Loss

Overall Profit/Loss

Portfolio Allocation Pie Chart

Portfolio Value Line Chart

Recent Transactions

Watchlist Preview

-----------------------------------

4. Portfolio Page

User can

Add Stock

Fields

Stock Name

Ticker

Quantity

Buy Price

Purchase Date

Current Price (manual entry or dummy API)

Automatically calculate

Investment

Current Value

Profit/Loss

Profit %

Edit Stock

Delete Stock

Search Stocks

Sort Table

-----------------------------------

5. Watchlist

Add favorite stocks

Fields

Company Name

Ticker

Current Price

Daily Change %

Remove Button

Use dummy stock prices or free stock API if available.

-----------------------------------

6. Transactions Page

Maintain transaction history.

Each transaction contains

Buy

Sell

Quantity

Price

Date

Display in table.

-----------------------------------

7. Analytics Page

Show

Portfolio Growth

Sector Distribution

Monthly Investment

Profit vs Loss

Use Chart.js or Recharts.

-----------------------------------

8. Profile Page

Display

Profile Picture

Name

Email

College

Course

Edit Profile

Change Password

-----------------------------------

9. About Project Page

Explain

Objectives

Technologies Used

Project Workflow

Future Enhancements

Developer Information

-----------------------------------

DATABASE COLLECTIONS

Users

Portfolio

Transactions

Watchlist

-----------------------------------

BACKEND

Create REST APIs

POST /register

POST /login

GET /portfolio

POST /portfolio

PUT /portfolio/:id

DELETE /portfolio/:id

GET /watchlist

POST /watchlist

DELETE /watchlist/:id

GET /transactions

POST /transactions

-----------------------------------

UI REQUIREMENTS

Responsive

Desktop First

Sidebar Navigation

Top Navbar

Cards

Tables

Charts

Dark Theme

Rounded Buttons

Hover Effects

Minimal Animations

Simple Icons using Lucide React.

-----------------------------------

DO NOT INCLUDE

❌ AI Predictions

❌ Real-time Trading

❌ Payment Gateway

❌ Blockchain

❌ Complex Admin Panel

❌ Professional Finance UI

❌ Advanced Analytics

Keep everything realistic for a college student project.

-----------------------------------

PROJECT STRUCTURE

client/

components/

pages/

hooks/

context/

services/

assets/

server/

controllers/

models/

routes/

middleware/

config/

utils/

-----------------------------------

CODE REQUIREMENTS

Write clean code.

Use reusable React components.

Keep folder structure simple.

Add comments where necessary.

Avoid unnecessary complexity.

-----------------------------------

BONUS FEATURES

Loading Spinner

Toast Notifications

404 Page

Protected Routes

Portfolio Search

Export Portfolio to CSV

Responsive Navbar

Simple Dashboard Charts

-----------------------------------

The final website should look like something a third-year Computer Science student built after learning the MERN stack over a semester. It should be impressive enough for a college project expo but not look like a commercial stock trading platform.