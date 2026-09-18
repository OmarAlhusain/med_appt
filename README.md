# StayHealthy - Medical Appointment Booking Application

StayHealthy is a React-based healthcare application that allows patients to register, log in, search for doctors, book appointments, manage their profile, submit reviews, receive appointment notifications, and access medical reports.

## Features

- Patient registration and login
- Doctor search by specialty
- Appointment booking
- Appointment cancellation
- Instant consultation booking
- Appointment notifications
- Patient profile management
- Doctor reviews and ratings
- Medical reports and prescription PDF
- Responsive user interface

## Technologies Used

- React
- Vite
- React Router
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token authentication

## Project Setup

Clone the repository:

`git clone https://github.com/OmarAlhusain/med_appt.git`

Navigate to the project directory:

`cd med_appt`

Install frontend dependencies:

`npm install`

Install backend dependencies:

`cd server`

`npm install`

`cd ..`

Create the required backend environment variables in:

`server/.env`

Example variables:

`MONGO_URI=your_mongodb_connection_string`

`JWT_SECRET=your_jwt_secret`

Start the backend server:

`cd server`

`node index`

Start the frontend development server in another terminal:

`npm run dev`

## Production Build

Create a production build with:

`npm run build`

## Main Application Routes

- `/` - Home
- `/signup` - Sign Up
- `/login` - Login
- `/appointments` - Find Doctors and Book Appointments
- `/instant-consultation` - Instant Consultation
- `/reviews` - Give Reviews
- `/profile` - Patient Profile
- `/reports` - Medical Reports

## Repository

https://github.com/OmarAlhusain/med_appt
