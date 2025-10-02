# Restaurant Ordering App Frontend

A modern restaurant ordering system built with Vite + React + TypeScript + Tailwind CSS.

## Features
- Role-based UI: Customer, Waiter, Admin
- Pages:
  - `/` — Menu (browse, add to cart)
  - `/order` — Checkout (guest checkout allowed)
  - `/order/:id` — Order status (shareable)
  - `/waiter` — Waiter dashboard (orders, assign table, mark served)
  - `/admin` — Admin dashboard (CRUD menu, orders, users)
  - `/login`, `/register`
- Real-time updates via socket.io-client
- API contract:
  - `GET /menu`
  - `POST /orders`
  - `GET /orders`
  - `PATCH /orders/:id`
  - Auth endpoints
- React Query + Axios for API calls
- Basic auth mock (localStorage) for dev

## Getting Started

1. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   ```
2. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.
3. Run the app:
   ```sh
   pnpm dev
   # or
   npm run dev
   ```

## .env.example
```
VITE_API_BASE_URL=http://localhost:4000/api
```

---

## File Structure
- `src/`
  - `components/` — Shared UI components
  - `pages/` — Route pages
  - `api/` — API clients
  - `hooks/` — Custom hooks
  - `utils/` — Utility functions
  - `App.tsx` — Main app with routes
  - `main.tsx` — Entry point
- `tailwind.config.ts`, `postcss.config.js` — Tailwind setup
- `vite.config.ts` — Vite config
- `tsconfig.json` — TypeScript config

---

## License
MIT
