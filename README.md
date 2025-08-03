# React + Vite

# BlogHub – Frontend

BlogHub is a simple blogging platform built with the MERN stack. This repository contains the frontend code, developed using React.js and Tailwind CSS.

## Features
- User authentication (Register, Login, Logout) with JWT stored in localStorage.
- View all blog posts with author and timestamps.
- Create new blogs using a modal form.
- Edit and delete options visible only for the logged-in author.
- Responsive design with mobile-friendly layout.

## Tech Stack
- React.js
- React Router DOM
- Tailwind CSS
- Axios

## Installation
1. Clone the repository:
   ```bash
   git clone <frontend-repo-url>
   cd frontend
 2.Install dependencies:
        npm install
        npm install axios react-icons
   # If using Tailwind CSS
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
3.Create a .env file in the root:
  VITE_API_URL=<your-backend-api-url>
4.Start the development server:
  npm run dev

