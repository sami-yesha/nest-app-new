# NestJS Microservices Starter

A production-ready NestJS microservices architecture with API Gateway, Authentication, and User Management services.

## Features

- **Hybrid Architecture**:
  - API Gateway (HTTP + TCP)
  - Auth Microservice (JWT authentication)
  - Users Microservice (CRUD operations)

- **Authentication**:
  - User registration & login
  - JWT token generation
  - Role-based access control (RBAC)

- **User Management**:
  - Create, read, update, delete users
  - Admin-only operations
  - Secure password handling

## Tech Stack

- **Core**: NestJS, TypeScript
- **Communication**: TCP microservices
- **Database**: MongoDB
- **Security**: JWT, bcrypt
- **Validation**: class-validator, class-transformer

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/nest-microservices.git
cd nest-microservices

2, Install dependencies

yarn install

3, Create .env file

4, Update .env with your configuration:

MONGODB_URI=mongodb://localhost:27017/nest-microservices
JWT_SECRET=your-very-strong-secret

Running the Services

Run each service in separate terminals:

1, Auth Service

yarn start:dev:auth

2, Users Service

yarn start:dev:users

3, Gateway Service

yarn start:dev:gateway


API Endpoints
Method	Endpoint	Description	Access
POST	/auth/register	Register new user	Public
POST	/auth/login	Login user	Public
GET	/users	List all users	User, Admin
POST	/users	Create new user	Admin only
GET	/users/:id	Get user by ID	User, Admin
PUT	/users/:id	Update user	Admin only
DELETE	/users/:id	Delete user	Admin only



Project Structure
Copy

nest-microservices/
├── apps/
│   ├── gateway/          # API Gateway (HTTP + TCP)
│   ├── auth/             # Auth Microservice
│   ├── users/            # Users Microservice
├── libs/
│   ├── common/           # Shared utilities, DTOs, guards
│   ├── database/         # MongoDB connection and models
├── .env.example          # Environment variables template
└── README.md             # Project documentation