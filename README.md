# Moroccan-Chipmunk-MVP

Minimal Express+EJS+MongoDB storefront for "Moroccan Chipmunk" (Chipmunk Electronique).

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
- Vanilla CSS (no Bootstrap, inline palette only)
- Session-based auth (no bcrypt, plain passwords for MVP)

## Palette
- **Deep Tech Navy** `#1B365D` – headers, primary buttons, text
- **Fez Red** `#A63A3A` – CTA buttons
- **Circuit Blue** `#49D1E4` – links, success
- **Chipmunk Tan** `#E59866` – card backgrounds
- **Clean White** `#FFFFFF` – global background

## DB
Single collection: `products`

Schema:
```javascript
{
  name: String,
  slug: String (unique),
  category: String (enum: Microcontrollers, Sensors, Displays),
  color: String (enum: Black, Blue),
  price: Number,
  imgUrl: String,
  desc: String
}
```

## Scripts
- `npm run dev` – nodemon server
- `npm run seed` – drop & insert 6 products (3 categories × 2 colors)

## Features
- ✅ Landing page with hero image and CTA
- ✅ Products page with category/color filters
- ✅ Product detail page
- ✅ Add to cart (requires authentication)
- ✅ Flash messages for user feedback
- ✅ Session-based authentication
- ✅ Responsive design

## Folder Structure
```
ChipMunk/
├── models/
│   ├── Product.js
│   └── User.js
├── public/
│   └── css/
│       └── style.css
├── scripts/
│   └── seed.js
├── views/
│   ├── layout.ejs
│   ├── index.ejs
│   ├── products.ejs
│   ├── product-detail.ejs
│   └── auth.ejs
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```
