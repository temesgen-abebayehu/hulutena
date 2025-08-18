# Hulutena

A full-stack MERN (MongoDB, Express, React, Node.js) application for healthcare management, featuring appointment booking, doctor-patient chat, community discussions, resource sharing, and secure authentication.

## Features

- User authentication and authorization (Admin, Doctor, Patient)
- Book and manage appointments
- Chat with doctors in real-time
- Community discussion forum
- Resource sharing (documents, audio, images)
- Payment integration
- Profile management and image upload
- Responsive frontend with Tailwind CSS and Vite

## Project Structure

```
Backend/
  controllers/        # API logic for each feature
  middlewares/        # Route protection and role-based access
  models/             # Mongoose schemas
  routes/             # Express route definitions
  services/           # Business logic (e.g., chatbot)
  utils/              # Utility functions
  config/             # Database and cloudinary config
  server.js           # Entry point

frontend/
  src/
   components/       # Reusable UI components
   pages/            # Main app pages
   ...               # Styles, assets, config
  public/             # Static assets
  index.html          # App entry
  package.json        # Frontend dependencies
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
  ```bash
  git clone https://github.com/temesgen-abebayehu/hulutena.git
  cd hulutena
  ```

2. **Backend Setup**
  ```bash
  cd Backend
  npm install
  # Create .env file with MongoDB URI, JWT secret, Cloudinary keys
  npm start
  ```

3. **Frontend Setup**
  ```bash
  cd ../frontend
  npm install
  npm run dev
  ```

4. **Access the app**
  - Frontend: `http://localhost:5173`
  - Backend API: `http://localhost:5000`

## Environment Variables

Create a `.env` file in `Backend/` with:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Scripts

- `npm start` (Backend): Starts Express server
- `npm run dev` (Frontend): Starts React app with Vite

## Technologies Used

- MongoDB, Mongoose
- Express.js
- React.js, Vite, Tailwind CSS
- Node.js
- Cloudinary (image uploads)
- JWT (authentication)

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
```
