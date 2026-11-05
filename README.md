# Employee Management System

A full-stack Employee Management System built with **React.js, JavaScript, Tailwind CSS, PHP, Laravel, and MySQL**. The application provides an administrator interface for managing employee records, viewing employee information, and monitoring workforce statistics through a dashboard.

The project uses **Docker Compose** to run the backend database environment without requiring XAMPP.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Authentication](#authentication)
- [Dashboard Statistics](#dashboard-statistics)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Employee Management System is a web-based application designed to simplify employee record management.

Administrators can securely log in, manage employee information, view individual employee profiles, and monitor workforce statistics from a centralized dashboard.

The application follows a client-server architecture:

- **Frontend:** React.js provides the user interface and handles user interactions.
- **Backend:** Laravel provides RESTful API endpoints and business logic.
- **Database:** MySQL stores employee records and administrator accounts.
- **Containerization:** Docker Compose manages the MySQL database environment.

## Features

### 1. Authentication

- Administrator login using username and password.
- Token-based authentication using Laravel Sanctum.
- Protected application routes.
- Automatic authentication token handling.
- Logout functionality.

### 2. Dashboard

Displays important workforce statistics:

- Total number of male employees.
- Total number of female employees.
- Average employee age.
- Total monthly salary expenses.

### 3. Employee Management

Complete CRUD (Create, Read, Update, Delete) functionality.

- Add new employees.
- View all employee records.
- View individual employee details.
- Update employee information.
- Delete employee records.
- Search and filter employee records.

### 4. Employee Details Modal

Clicking an employee record opens a modal displaying:

- Employee ID.
- First name.
- Last name.
- Gender.
- Birthday.
- Monthly salary.
- Date created.
- Last updated date.

The employee details are retrieved from the individual employee API endpoint.

### 5. User Interface

- Responsive administrator dashboard.
- Sidebar navigation.
- Navigation bar.
- Reusable React components.
- Employee data table.
- Reusable employee form for adding and editing records.
- Employee details modal.
- Loading indicators and error handling.
- Show/hide password functionality on the login page.

---

## Technology Stack

| Category | Technology |
|---|---|
| Frontend | React.js |
| Programming Language | JavaScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Backend | PHP |
| Backend Framework | Laravel |
| Authentication | Laravel Sanctum |
| Database | MySQL |
| Containerization | Docker |
| Container Management | Docker Compose |
| API Architecture | REST API |

---

## System Architecture

```text
                  ADMINISTRATOR
                        |
                        v
              REACT.JS FRONTEND
                 (Vite + JS)
                        |
                 Axios HTTP Client
                        |
                  REST API
                        |
                        v
              LARAVEL BACKEND
                        |
             +----------+----------+
             |                     |
             v                     v
       Sanctum Auth          API Controllers
             |                     |
             |              Business Logic
             |                     |
             +----------+----------+
                        |
                        v
                   MYSQL DB
                  (Docker)
```

### Application Flow

1. The administrator opens the React application.
2. The administrator enters their username and password.
3. React sends the credentials to the Laravel login endpoint.
4. Laravel validates the credentials and generates an authentication token.
5. The frontend stores the token and attaches it to subsequent API requests.
6. The administrator accesses the protected dashboard and employee management pages.
7. Employee operations are processed by Laravel and stored in MySQL.
8. The dashboard retrieves employee statistics from the backend.

---

## Project Structure

The project is organized into separate frontend and backend directories.

```text
employee-management-system/
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       ├── AuthController.php
│   │   │       ├── EmployeeController.php
│   │   │       └── DashboardController.php
│   │   │
│   │   └── Models/
│   │       ├── Employee.php
│   │       └── User.php
│   │
│   ├── database/
│   │   └── migrations/
│   │
│   ├── routes/
│   │   └── api.php
│   │
│   ├── .env
│   ├── artisan
│   └── composer.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── EmployeeTable.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   └── EmployeeDetailsModal.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
└── README.md
```

*Note: This is the documented target structure. Adjust the filenames if your actual implementation differs.*

---

## Database Design

### Employees Table

Stores employee information.

| Column | Data Type | Description |
|---|---|---|
| id | BIGINT | Primary key |
| first_name | VARCHAR(255) | Employee first name |
| last_name | VARCHAR(255) | Employee last name |
| gender | VARCHAR(20) | Employee gender |
| birthday | DATE | Employee birthday |
| monthly_salary | DECIMAL(10,2) | Employee monthly salary |
| created_at | TIMESTAMP | Record creation date |
| updated_at | TIMESTAMP | Last update date |

### Users Table

Stores administrator account information using Laravel's authentication system.

| Column | Data Type | Description |
|---|---|---|
| id | BIGINT | Primary key |
| name | VARCHAR(255) | Administrator name |
| username | VARCHAR(255) | Login username |
| email | VARCHAR(255) | Administrator email, if used |
| password | VARCHAR(255) | Hashed password |
| created_at | TIMESTAMP | Record creation date |
| updated_at | TIMESTAMP | Last update date |

Laravel Sanctum also uses its personal access tokens table when using bearer-token authentication.

---

## API Endpoints

Base URL:

```text
http://localhost:8000/api
```

### Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/login` | Administrator login | No |
| POST | `/logout` | Administrator logout | Yes |

### Employee Management

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/employees` | Retrieve all employees | Yes |
| GET | `/employees/{id}` | Retrieve one employee | Yes |
| POST | `/employees` | Create an employee | Yes |
| PUT | `/employees/{id}` | Update an employee | Yes |
| DELETE | `/employees/{id}` | Delete an employee | Yes |

### Dashboard

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/dashboard` | Retrieve dashboard statistics | Yes |

### Example: Employee Details Response

Request:

```http
GET /api/employees/1
```

Example response:

```json
{
    "id": 1,
    "first_name": "Christian",
    "last_name": "Pantilon",
    "gender": "Male",
    "birthday": "2004-04-02",
    "monthly_salary": "25000.00",
    "created_at": "2026-11-05T02:13:02.000000Z",
    "updated_at": "2026-11-05T03:19:49.000000Z"
}
```

### Example: Create Employee Request

```json
{
    "first_name": "Juan",
    "last_name": "Dela Cruz",
    "gender": "Male",
    "birthday": "2000-05-15",
    "monthly_salary": 30000
}
```

### Example: Login Request

```json
{
    "username": "admin",
    "password": "your-password"
}
```

---

## Prerequisites

Install the following tools before setting up the project:

- [Node.js](https://nodejs.org/) and npm
- [PHP](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

You do not need XAMPP if you use Docker for your MySQL database.

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd employee-management-system
```

### 2. Start the MySQL Database Using Docker

Make sure Docker Desktop is running.

From the project root:

```bash
docker compose up -d
```

Check running containers:

```bash
docker compose ps
```

View database logs:

```bash
docker compose logs -f
```

### 3. Configure the Laravel Backend

Open the backend directory:

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure the database connection in `.env`:

```env
APP_NAME="Employee Management System"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=employee_management
DB_USERNAME=root
DB_PASSWORD=your_database_password
```

Use the actual credentials and host port configured in `docker-compose.yml`. If the host port is mapped to `3307`, set `DB_PORT=3307` when running Laravel directly on your computer.

Run database migrations:

```bash
php artisan migrate
```

If your project includes a database seeder for the administrator account:

```bash
php artisan db:seed
```

Install or configure Laravel Sanctum if it has not already been configured:

```bash
php artisan install:api
```

Follow the Laravel version's setup instructions and avoid overwriting an existing API configuration.

Start the Laravel development server:

```bash
php artisan serve
```

The backend should now be available at:

```text
http://localhost:8000
```

### 4. Configure the React Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the React development server:

```bash
npm run dev
```

The frontend should now be available at:

```text
http://localhost:5173
```

---

## Environment Configuration

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000/api
```

### Backend `.env`

```env
APP_NAME="Employee Management System"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=employee_management
DB_USERNAME=root
DB_PASSWORD=your_database_password
```

**Important:** Never commit your `.env` files or actual database credentials to GitHub.

---

## Running the Application

Start Docker:

```bash
docker compose up -d
```

Start the Laravel backend:

```bash
cd backend
php artisan serve
```

Start the React frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the application:

```text
http://localhost:5173
```

### Application Access

| Application | URL |
|---|---|
| React Frontend | http://localhost:5173 |
| Laravel Backend | http://localhost:8000 |
| API Base URL | http://localhost:8000/api |

---

## Authentication

The application uses Laravel Sanctum for API authentication.

The authentication process works as follows:

1. The administrator submits their username and password.
2. The frontend sends a POST request to `/api/login`.
3. Laravel validates the credentials.
4. Laravel generates an access token.
5. The frontend stores the returned token.
6. Axios attaches the token to authenticated API requests.

Example request header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
Accept: application/json
```

Protected API routes should use Laravel's authentication middleware:

```php
Route::middleware('auth:sanctum')->group(function () {
    // Protected employee and dashboard routes
});
```

The frontend route protection is intended for navigation and user experience. Actual authorization must always be enforced by the Laravel backend.

---

## Dashboard Statistics

The dashboard displays four key metrics:

| Statistic | Description |
|---|---|
| Male Employees | Total employees with gender set to Male |
| Female Employees | Total employees with gender set to Female |
| Average Age | Average employee age calculated from birthdays |
| Total Monthly Salary | Sum of all employee monthly salaries |

The backend calculates these values and returns them through:

```http
GET /api/dashboard
```

Example response structure:

```json
{
    "male_employees": 10,
    "female_employees": 8,
    "average_age": 27.5,
    "total_monthly_salary": 450000
}
```

*The response above is an example; actual values depend on the database records.*

---

## Troubleshooting

### MySQL Port Already in Use

If Docker returns an error similar to:

```text
ports are not available:
listen tcp 0.0.0.0:3306:
bind: Only one usage of each socket address
```

Another application, such as a locally installed MySQL service, is already using port `3306`.

Change the host port mapping in `docker-compose.yml`:

```yaml
ports:
  - "3307:3306"
```

Then update the Laravel `.env` file:

```env
DB_PORT=3307
```

Restart Docker:

```bash
docker compose down
docker compose up -d
```

### Laravel Cannot Connect to MySQL

Check the following:

- Docker Desktop is running.
- The MySQL container is running.
- The database name and credentials are correct.
- The configured database port matches the Docker host port.
- Laravel is configured with the correct database host.

If Laravel runs directly on your computer, use `127.0.0.1` and the published host port. If Laravel runs inside Docker, use the MySQL service name and its internal port `3306`.

### Frontend Cannot Connect to Laravel

Check that:

- Laravel is running on port `8000`.
- The frontend `.env` has the correct `VITE_API_URL`.
- Laravel CORS configuration allows the frontend origin.
- Authenticated requests include the bearer token.
- The API routes are registered correctly.

After changing frontend environment variables, restart Vite.

### Clear Laravel Configuration Cache

```bash
php artisan optimize:clear
```

### Check Laravel API Routes

```bash
php artisan route:list --path=api
```

---

## Future Improvements

Potential enhancements for future versions:

- Employee profile photos.
- Employee pagination and advanced filtering.
- Export employee records to PDF and Excel.
- Salary history and payroll management.
- Employee account management and role-based access control.
- Audit logs for employee record changes.
- Automated backend and frontend testing.
- Production deployment using Docker.

---

## License

This project was developed as a mini-project for learning and demonstrating full-stack web application development.

You may modify and extend the project for educational and personal development purposes.

---

**Developed using React.js, Laravel, MySQL, and Docker.**