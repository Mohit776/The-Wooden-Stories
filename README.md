# Wooden Stories

A full-stack web application for showcasing and selling handcrafted wooden products, with a customer-facing storefront, an admin dashboard, and a Node.js/Express backend.

This repository contains three main parts:

- **WoodenStories-Main** – customer storefront (React + Vite + Tailwind CSS)
- **WoodenStories-Admin** – admin dashboard for managing products and content (React + Vite + Tailwind CSS)
- **WoodenStories-Backend** – REST API and persistence layer (Express + Prisma + MySQL + Cloudinary)

---

## Tech Stack

### Frontend (Main & Admin)
- **React 19** with functional components and hooks
- **Vite** for fast dev server and build tooling
- **React Router 7** for routing (storefront)
- **React Router DOM 7** for routing (admin & storefront)
- **Tailwind CSS 4** for styling
- **Lucide React** for icons
- **Axios** for HTTP requests

### Backend
- **Node.js / Express** API (type: `module`)
- **Prisma** ORM (`@prisma/client`, `prisma`)
- **MySQL** via `mysql2`
- **Cloudinary** + `multer` + `multer-storage-cloudinary` for image upload
- **dotenv** for environment configuration
<<<<<<< HEAD
- **cors**, `morgan` and other typical Express middleware
=======
- **cors`, `morgan` and other typical Express middleware
>>>>>>> c297cf653e5cfb79bb8b0ad9725bee431e88bf13

---

## High-Level Workflow

### 1. Backend API (WoodenStories-Backend)

- Exposes REST endpoints (typically under `http://localhost:5000/api/...`).
- Handles:
  - Product CRUD operations
  - Image upload to Cloudinary
  - Database persistence via Prisma + MySQL
- Admin and main frontends call this API for product data.

<<<<<<< HEAD
### Architecture Diagram

```mermaid
graph TD
    Main[Frontend: Main] --> Backend[Backend API]
    Admin[Frontend: Admin] --> Backend
    Backend --> Database[MySQL Database]
    Backend --> Cloudinary[Cloudinary]
```

=======
>>>>>>> c297cf653e5cfb79bb8b0ad9725bee431e88bf13
### 2. Admin Dashboard (WoodenStories-Admin)

- Built with React + Vite.
- Uses a proxy to `http://localhost:5000` (see `proxy` field in `package.json`) so that frontend calls like `fetch("/api/products")` or `axios` requests are forwarded to the backend.
- Key flows:
  - **Product Management**: list, search, filter, create, edit and delete products.
  - **Media Handling**: sends image data/files to backend which uploads to Cloudinary.

### 3. Customer Storefront (WoodenStories-Main)

- Built with React + Vite.
- Uses **React Router** for pages such as:
  - `/` – Home
  - `/products` – Product listing
  - `/cart` – Shopping cart
  - `/wishlist` – Wishlist
  - `/account`, `/about`, `/contact`, etc.
- Product listing (`src/Pages/products.jsx`):
  - Fetches products from `/api/products`.
  - Transforms backend data for display (images, pricing, tags, stock badges).
  - Provides search, sorting, category filters, and price range controls.
- Cart (`src/Pages/cart.jsx`):
  - Reads and writes `cartItems` to `localStorage`.
  - Supports quantity changes, removal, coupon codes, and order summary.
- Add to Cart (from products page):
  - Clicking **Add to Cart** on a product stores that item in `localStorage.cartItems`.
  - Button shows a green state after successfully adding.
  - `/cart` loads and persists the same `cartItems` so cart state survives page reloads.

---

## Key Features

### Storefront (WoodenStories-Main)
- **Dynamic product catalog** fetched from backend API.
- **Filtering & search**: category filters, price range slider, text search.
- **Sorting**: by featured, name, price, rating.
- **Responsive UI** with a premium look-and-feel using Tailwind.
- **Wishlist toggle** per product card.
- **Shopping cart** with:
  - Add to cart from product cards (grid & list views)
  - Cart persisted in `localStorage`
  - Quantity increment/decrement
  - Item removal
  - Coupon support (`WOOD10`, `SAVE500` in current implementation)

### Admin Dashboard (WoodenStories-Admin)
- **Products Management** screen:
  - Fetches products from backend (`/api/products`).
  - Searching, filtering by status, and refresh.
  - Edit & delete actions per product.
  - Add product screen accessible via UI actions.
- **Image preview/handling** for product images.

### Backend (WoodenStories-Backend)
- **Express API** for products and related entities.
- **Prisma** for schema-based access to MySQL database.
- **Cloudinary integration** for image hosting.
- **Multer middleware** for handling uploads.
- **dotenv-based configuration** for secrets and connection strings.

### Payment Gateway Integration
- **Supported Payment Methods**:
  - Credit/Debit Cards (Visa, MasterCard, etc.)
  - Net Banking
  - UPI Payments
  - Wallet Payments (Paytm, PhonePe, etc.)
- **Integration Status**: Currently integrated with [Razorpay](https://razorpay.com/)
- **Configuration**: Requires Razorpay API keys in backend `.env`:
  ```env
  RAZORPAY_KEY_ID=your_key_id
  RAZORPAY_KEY_SECRET=your_key_secret
  ```
- **Flow**:
  1. Frontend creates order with backend
  2. Backend initiates Razorpay payment
  3. User completes payment on Razorpay checkout
  4. Webhook verifies payment and updates order status

---

## Recent Improvements

### SEO Improvements (WoodenStories-Main & WoodenStories-Admin)
- Dynamic page titles and meta descriptions for all routes
- Open Graph and Twitter Card meta tags
- JSON-LD structured data for products
- Admin panel explicitly marked as noindex

### Backend URL Configuration
- Frontends now use `VITE_BACKEND_URL` environment variable instead of hardcoded `localhost:5000`
- Example `.env` setup:
  ```env
  VITE_BACKEND_URL=http://localhost:5000
  ```

### Code Quality
- Removed unused imports and debug logs
- Centralized backend URL configuration
- Improved admin panel HTML semantics

---

## Local Development Setup

### Prerequisites

- **Node.js** (LTS recommended)
- **npm** or **yarn** (README uses `npm` examples)
- **MySQL** server running and accessible
- **Cloudinary** account (for image uploads)

Clone the repository:

```bash
git clone <your-repo-url>
cd "Wooden Stories"
```

---

## 1. Backend Setup (WoodenStories-Backend)

1. Go to the backend folder:
   ```bash
   cd "WoodenStories-Backend"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in `WoodenStories-Backend` (if not present) with values such as:
     ```env
     DATABASE_URL="mysql://user:password@localhost:3306/wooden_stories"
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     PORT=5000
     ```

4. Run Prisma migrations (if Prisma schema is present):
   ```bash
   npx prisma migrate dev
   ```

5. Start the backend server (adjust command if you add a script):
   ```bash
   node index.js
   ```

   Ensure it listens on **http://localhost:5000** so the frontends can reach `/api/...`.

---

## 2. Admin Dashboard Setup (WoodenStories-Admin)

1. In a new terminal, go to the admin folder:
   ```bash
   cd "WoodenStories-Admin"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open the printed local URL (typically `http://localhost:5173`).

The admin app is configured with a proxy to `http://localhost:5000`, so calls to `/api/...` from the browser are forwarded to your backend.

---

## 3. Storefront Setup (WoodenStories-Main)

1. In another terminal, go to the main folder:
   ```bash
   cd "WoodenStories-Main"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open the printed local URL for the storefront (e.g. `http://localhost:5173` or another Vite port if in use).

The storefront fetches products from `/api/products`. In development you’ll typically configure Vite’s dev server proxy (or use a relative path plus a dev server proxy) so that this hits the backend at `http://localhost:5000/api/products`.

---

## Build & Production

### Build the frontends

From each frontend directory (`WoodenStories-Main` and `WoodenStories-Admin`):

```bash
npm run build
```

This runs `vite build` and outputs static assets under `dist/`.

### Preview the production build

```bash
npm run preview
```

Vite will start a local server serving the production build so you can test before deploying.

---

## Project Structure

```text
Wooden Stories/
├── WoodenStories-Main/        # Customer storefront (React + Vite + Tailwind)
├── WoodenStories-Admin/       # Admin dashboard (React + Vite + Tailwind)
├── WoodenStories-Backend/     # Node/Express backend API (Prisma + MySQL + Cloudinary)
└── README.md                  # This documentation
```

---

## Notes & Next Steps

- Add proper `start` / `dev` scripts in `WoodenStories-Backend/package.json` (e.g. `"dev": "nodemon index.js"`, `"start": "node index.js"`).
- Document the exact API endpoints in a separate `API.md` if desired.
- Expand this README with deployment steps (e.g. Docker, hosting provider) when you decide on a production environment.
