# E-Commerce Full-Stack Application

A comprehensive full-stack e-commerce platform built with React (frontend) and Node.js (backend).

## 🚀 Features

### Frontend (Client)
- **React 18** with Vite for fast development
- **Tailwind CSS** for responsive styling
- **React Router** for navigation
- **Redux Toolkit** for state management
- **Shadcn/ui** components for modern UI
- **Responsive design** for all devices
- **Shopping cart** functionality
- **User authentication** and authorization
- **Admin dashboard** for management
- **Product filtering** and search
- **Order management** system

### Backend (Server)
- **Node.js** with Express.js framework
- **MongoDB** for database
- **JWT authentication**
- **Cloudinary** for image uploads
- **PayPal** integration for payments
- **RESTful API** design
- **Middleware** for security and validation
- **Error handling** and logging

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - CSS framework
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **Shadcn/ui** - UI components

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **PayPal SDK** - Payment processing

## 📁 Project Structure

```
ecommerce-fullstack-app/
├── Client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   ├── assets/        # Static assets
│   │   └── lib/          # Utilities
│   └── package.json
├── Server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── helpers/          # Helper functions
│   └── server.js         # Entry point
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Cloudinary account
- PayPal developer account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-fullstack-app.git
   cd ecommerce-fullstack-app
   ```

2. **Install Server dependencies**
   ```bash
   cd Server
   npm install
   ```

3. **Install Client dependencies**
   ```bash
   cd ../Client
   npm install
   ```

4. **Set up environment variables**

   **Server/.env**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   ```

   **Client/.env**
   ```
   VITE_API_URL=http://localhost:5000
   ```

5. **Start the development servers**

   **Backend**
   ```bash
   cd Server
   npm run dev
   ```

   **Frontend**
   ```bash
   cd Client
   npm run dev
   ```

## 🎯 Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🔐 Environment Variables

### Server Environment Variables
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `PAYPAL_CLIENT_ID` - PayPal client ID
- `PAYPAL_CLIENT_SECRET` - PayPal client secret

### Client Environment Variables
- `VITE_API_URL` - Backend API URL

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Deploy the Server folder

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

## 📞 Contact
For any questions or support, please open an issue on GitHub.
