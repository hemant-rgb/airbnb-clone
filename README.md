# Airbnb Clone 🏡

This project is an **Airbnb Clone** built with some of the core functionalities of the original platform. It allows users to view, create, edit, and delete listings, register and log in securely, and store images using cloud storage.

## 🌐 Live Website

[Visit the website here](https://airbnb-proxy.airbnb-clone-hemant.workers.dev)

---

## 🚀 Features

- ✅ View, add, edit, and delete property listings.
- ✅ Secure user authentication and session management (using Passport.js).
- ✅ Upload and manage images (integrated with Cloudinary).
- ✅ Form validation and error handling using Joi.
- ✅ Flash messages for user feedback.
- ✅ Proxy deployment via Cloudflare Workers to ensure HTTPS.
- ✅ MongoDB Atlas database integration.
- ✅ MVC architecture for clean and modular codebase.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Templating Engine:** EJS
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** Passport.js
- **Session Management:** express-session, connect-mongo
- **Cloud Services:** Cloudinary, Render, Cloudflare Workers
- **File Uploads:** multer
- **Validation:** Joi
- **Styling:** Bootstrap 5, Font Awesome
- **Architecture:** MVC

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hemant-rgb/airbnb-clone.git
   cd airbnb-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup Environment Variables:**
   Create a `.env` file and add the following:

   ```env
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRETCODE=your_cloudinary_secret
   ATLASDB_URL=your_mongodb_atlas_connection_url
   SECRET=your_session_secret
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

5. Visit `http://localhost:8080` in your browser.

---

## 📂 Project Structure

```
airbnb-clone/
│
├── controllers/       # Route handlers
├── models/            # Mongoose models
├── public/            # Static assets (CSS, JS, Images)
├── routes/            # Express routes
├── views/             # EJS templates
├── .env               # Environment variables (not committed)
├── app.js             # Main application file
├── package.json       # NPM configuration
└── README.md          # Project documentation
```

---

## ⚠️ Disclaimer

This project is for **educational purposes** and not intended for production use.

---

## 📧 Contact

For any questions or suggestions, feel free to reach out: **hemantmachiwar76@gmail.com**

---

© 2025 Hemant Machiwar. All rights reserved.
