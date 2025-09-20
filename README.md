# 🏥 Doctor Appointment Scheduling System

A comprehensive full-stack web application for managing doctor appointments, built with React.js and Node.js. This system allows patients to book appointments with doctors and enables doctors to manage their schedules efficiently.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)

## ✨ Features

### 👥 User Management
- **User Registration**: Patients and Doctors can register with role selection
- **Secure Authentication**: JWT-based login system with password hashing
- **Role-based Access**: Separate dashboards for Patients and Doctors
- **Profile Management**: View and manage user profiles

### 🩺 Doctor Management
- **Doctor Directory**: Browse all available doctors
- **Specialization Filter**: Filter doctors by medical specialization
- **Time Slot Management**: Predefined appointment time slots
- **Doctor Profiles**: Comprehensive doctor information display

### 📅 Appointment System
- **Book Appointments**: Easy appointment booking with doctor selection
- **Smart Scheduling**: Date and time slot selection with validation
- **Status Tracking**: Real-time appointment status (Pending, Approved, Canceled, Completed)
- **Appointment History**: View past and upcoming appointments

### 📊 Dashboard Features

#### Patient Dashboard
- View personal information
- Browse available doctors by specialization
- Book new appointments
- View appointment history
- Manage existing appointments
- Delete appointments and profile

#### Doctor Dashboard
- View personal information
- Manage patient appointments
- Approve/cancel appointment requests
- View appointment schedule
- Delete profile

## 🛠️ Technology Stack

### Frontend
- **React.js 18.3.1** - Modern UI framework
- **Ant Design 5.21.2** - Professional UI component library
- **React Router 6.26.2** - Client-side routing
- **Axios 1.7.7** - HTTP client for API calls
- **CSS3** - Custom styling and responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.21.0** - Web application framework
- **MySQL2 3.11.3** - Database driver
- **JWT 9.0.2** - JSON Web Token authentication
- **bcryptjs 2.4.3** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing
- **Morgan 1.10.0** - HTTP request logger

### Database
- **MySQL** - Relational database management system
- **Stored Procedures** - Secure user creation
- **Triggers** - Automatic appointment status updates
- **Events** - Scheduled database maintenance

## 📁 Project Structure

```
doctor-appointment-system/
├── 📁 client/                    # React Frontend
│   ├── 📁 public/               # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable components
│   │   ├── 📁 pages/           # Page components
│   │   ├── 📁 styles/          # CSS styling
│   │   └── 📁 utils/           # Utility functions
│   └── package.json
├── 📁 config/                   # Database configuration
├── 📁 controllers/              # Business logic
├── 📁 database_queries/         # SQL scripts
├── 📁 middelwares/              # Authentication & validation
├── 📁 models/                   # Database models
├── 📁 routes/                   # API routes
├── server.js                    # Main server file
└── package.json
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- npm 

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sushant-Khot/Doctor-online-appointment-sceduling-system.git
cd doctor-appointment-sceduling-system
```

### Step 2: Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 3: Database Setup
1. Create a MySQL database
2. Run the SQL scripts from `database_queries/database_queries.sql`
3. The script will create all necessary tables, stored procedures, and sample data

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Server Configuration
PORT=8080
NODE_ENV=development
```

## 🎯 Usage

### Development Mode
```bash
# Run both backend and frontend concurrently
npm run dev

# Or run separately:
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend client
npm run client
```

### Production Mode
```bash
# Build the frontend
cd client
npm run build
cd ..

# Start the production server
npm start
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/getUserData` - Get user profile

### Doctors
- `GET /api/doctors` - Get all doctors (with optional filters)
- `GET /api/doctorRoute/me` - Get doctor profile
- `DELETE /api/doctors/:id` - Delete doctor profile

### Appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get all appointments (with filters)
- `GET /api/appointments/patient` - Get patient appointments
- `GET /api/appointments/Doctor` - Get doctor appointments
- `PUT /api/appointments/:id/status` - Update appointment status
- `DELETE /api/appointments/:id` - Delete appointment

## 🗄️ Database Schema

### Tables
1. **users** - User credentials and roles
2. **doctors** - Doctor information and specializations
3. **appointments** - Appointment bookings and status

### Advanced Features
- **Stored Procedures**: `create_user()` for secure user creation
- **Triggers**: Automatic status updates for expired appointments
- **Events**: Scheduled status updates every hour
- **Functions**: Custom functions for appointment validation


### Home Page
- Welcome page with navigation options
- Clean and professional design
- Easy access to registration and login

### User Registration/Login
- Role-based registration (Patient/Doctor)
- Secure authentication system
- Form validation and error handling

### Appointment Booking
- Doctor selection by specialization
- Date and time slot selection
- Contact information and appointment details

### Dashboard Views
- **Patient Dashboard**: Appointment history, doctor browsing, booking
- **Doctor Dashboard**: Appointment management, approval/cancellation

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin request handling

---

**⭐ If you found this project helpful, please give it a star!**

For support or questions, please open an issue on GitHub or contact the authors.
