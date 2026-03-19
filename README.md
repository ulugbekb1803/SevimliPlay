# 🎬 SevimliPlay — Kino & Serial Platformasi

Netflix uslubida professional kino ko'rish sayt. React + Vite + TMDB API bilan ishlaydi.

## ✨ Xususiyatlar

- 🔐 **Ro'yxatdan o'tish / Kirish** — animatsiyali auth sahifasi
- 🎬 **Kinolar** — 500+ sahifa, filtrlar bilan
- 📺 **Seriallar** — Rus va xorijiy seriallar
- 🔍 **Qidiruv** — real-time qidiruv
- 🎭 **Janrlar** — 18 ta janr
- ▶️ **Trailer** — YouTube orqali HD/4K trailerlar
- 🇷🇺 **Rus kinolari** — alohida bo'lim
- ⭐ **Top baholangan** — IMDB uslubida
- 📱 **Responsive** — mobil qurilmalar uchun

## 🚀 O'rnatish

```bash
# 1. Papkaga kiring
cd sevimliplay

# 2. Paketlarni o'rnating
npm install

# 3. Ishga tushiring
npm run dev
```

Brauzerda: **http://localhost:5173**

## 📁 Loyha tuzilmasi

```
sevimliplay/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      ← Navigatsiya paneli
│   │   ├── HeroBanner.jsx  ← Bosh sahifa banner
│   │   ├── MovieCard.jsx   ← Kino kartochkasi
│   │   ├── MovieRow.jsx    ← Gorizontal qator
│   │   ├── MovieModal.jsx  ← Trailer + ma'lumot modal
│   │   └── Footer.jsx      ← Pastki qism
│   ├── pages/
│   │   ├── HomePage.jsx    ← Bosh sahifa
│   │   ├── MoviesPage.jsx  ← Kinolar sahifasi
│   │   ├── SerialsPage.jsx ← Seriallar sahifasi
│   │   ├── SearchPage.jsx  ← Qidiruv sahifasi
│   │   ├── GenresPage.jsx  ← Janrlar sahifasi
│   │   └── AuthPage.jsx    ← Login/Register
│   ├── context/
│   │   └── AuthContext.jsx ← Foydalanuvchi holati
│   ├── hooks/
│   │   └── useTMDB.js      ← TMDB API hook
│   ├── App.jsx             ← Asosiy komponent + routing
│   ├── App.css             ← Barcha stillar
│   └── main.jsx            ← Entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🔑 API haqida

Bu loyha **TMDB (The Movie Database)** API'dan foydalanadi:
- 1,000,000+ kino va serial
- Rus, ingliz va boshqa tillarda ma'lumotlar
- YouTube trailerlar
- Aktyor ma'lumotlari
- API bepul!

## 👥 Git bilan 2 kishi ishlash

```bash
# Birinchi marta
git clone <repo-url>
cd sevimliplay
npm install

# Har kuni
git pull
# ... ishlang ...
git add .
git commit -m "nima qildim"
git push
```

## 🛠️ Texnologiyalar

- **React 18** + **Vite 5**
- **React Router DOM 6**
- **Axios** (API so'rovlar)
- **TMDB API** (ma'lumotlar)
- **YouTube Embed** (trailerlar)
- **CSS Variables** (dizayn tizimi)
- **Google Fonts** (Bebas Neue + Outfit)

---

Made with ❤️ for SevimliPlay
