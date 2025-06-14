# 🔐 PassOP – React Password Manager

**PassOP** is a simple password manager built with React. It comes in two versions:
- **Local Storage version** – All data is stored in the browser.
- **MongoDB version** – A full-stack app with a backend using Express and MongoDB.

Live demo is available in the GitHub repo's "About" section.

---

## ✨ Features

- ✅ Add, edit, and delete passwords (CRUD)
- 👁️ Show/Hide password toggle
- 📋 Copy password to clipboard
- ⚙️ Built with React & Tailwind CSS
- 💾 Option to store data locally or on a MongoDB database

---

## 📁 Project Structure

```
.
├── Password Manager with Local Storage/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Manager.jsx
│   │   │   └── nabar.jsx
│   │   ├── App.jsx, App.css, main.jsx
│   └── dist/ (built files for deployment)
│
├── Password Manager with MongoDB/
│   ├── Backend/
│   │   ├── server.js
│   │   └── .env  (contains MONGO_URI)
│   └── Frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Manager.jsx
│       │   │   └── nabar.jsx
│       │   ├── App.jsx, App.css, main.jsx
```

---

## 🚀 Technologies Used

### Local Storage Version
- React
- Tailwind CSS
- Vite

### MongoDB Version
- React (Frontend)
- Tailwind CSS
- Express.js (Backend)
- MongoDB (using `mongodb` npm package)
- Node.js
- Vite

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/passop.git
cd passop
```

---

### 2. Run Local Storage Version

```bash
cd "Password Manager with Local Storage"
npm install
npm run dev
```

---

### 3. Run MongoDB Version

#### Backend:

```bash
cd "Password Manager with MongoDB/Backend"
npm install
# Create a .env file and add your MongoDB URI:
# MONGO_URI = "your-mongodb-uri"
node server.js
```

#### Frontend:

```bash
cd "Password Manager with MongoDB/Frontend"
npm install
npm run dev
```

Make sure the backend server is running on the correct port (e.g., 5000), and the frontend fetches data from that port.

---

## 📷 Live Demo

You can find the live demo link in the repo's **About** section (right sidebar).

---

## ⚠️ Disclaimer

This project is a **practice project** and not meant for storing personal or sensitive passwords in production.

Especially for the MongoDB version:
- ❌ No authentication
- ❌ No encryption
- ❌ All users share the same database entries

Please use it only for learning or demonstration purposes.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> Created by HamzaDevelops42