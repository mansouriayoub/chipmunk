# Moroccan-Chipmunk-MVP

Minimal Express+EJS+MongoDB storefront for "Moroccan Chipmunk".

## 1-second start
```bash
cp .env.example .env          # add your MONGO_URI
npm i
npm run seed                  # creates 6 dummy products
npm run dev                   # localhost:3000
```

## Routes
- `/` – landing page with hero and CTA
- `/products` – filterable product list with sidebar
- `/products/:slug` – product detail + add-to-cart (auth wall)
- `/auth` – login/register page

## Stack
- Node 20, Express 4, EJS, Mongoose
- BootstrapCSS
- Session-based auth (no bcrypt, plain passwords for MVP)