# NestJS Microservices Starter 🚀

A **production-ready** NestJS microservices architecture with an API Gateway, Authentication, and User Management services.

## 📌 Features

### ✅ **Hybrid Architecture**
- API Gateway with **HTTP + TCP communication**
- Authentication microservice with **JWT-based authentication**
- Users microservice for **user management and role-based access control (RBAC)**

### 🔒 **Authentication & Security**
- User registration & login
- **JWT token generation & validation**
- Secure **password hashing with bcrypt**
- Role-based access control (**RBAC**)

### 👥 **User Management**
- Create, read, update, and delete users
- **Admin-only operations** for user management
- Secure user data handling

## 🛠 **Tech Stack**

- **Core**: NestJS, TypeScript
- **Communication**: TCP microservices
- **Database**: MongoDB
- **Security**: JWT, bcrypt
- **Validation**: class-validator, class-transformer

---

## 🚀 Getting Started

### 📌 Prerequisites

Make sure you have the following installed:
- **Node.js** (v16+)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### 🔧 Installation

1️⃣ **Clone the repository:**
```bash
  git clone https://github.com/sami-yesha/nest-app-new.git
  cd nest-app-new
```

2️⃣ **Install dependencies:**
```bash
  yarn install  # or npm install
```

3️⃣ **Set up environment variables:**
- Create a **.env** file in the root directory (`nest-app-new`)
- Add the following configurations:

```env
MONGODB_URI=mongodb://localhost:27017/nest-microservices
JWT_SECRET=your-very-strong-secret
```

---

## ⚡ Running the Services

Each microservice runs independently. Open **separate terminals** and start each service:

### 🛡 **Auth Service**
```bash
yarn start:dev:auth
```

### 👥 **Users Service**
```bash
yarn start:dev:users
```

### 🌐 **Gateway Service**
```bash
yarn start:dev:gateway
```

---

## 📡 API Endpoints

| Method | Endpoint       | Description         | Access |         | Authorization
|--------|---------------|---------------------|--------|----------|-------------
| POST   | `/auth/register` | Register new user  | Public |          | N/A
| POST   | `/auth/login`    | Login user        | Public |           | N/A
| GET    | `/users`        | List all users     | User, Admin |      | Bearer token required
| POST   | `/users`        | Create new user    | Admin only |       | Bearer token required
| GET    | `/users/:id`    | Get user by ID     | User, Admin |      | Bearer token required
| PUT    | `/users/:id`    | Update user        | Admin only |       | Bearer token required
| DELETE | `/users/:id`    | Delete user        | Admin only |       | Bearer token required

---

## 📂 Project Structure

```
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
```

---

## 🚀 Deployment

### 🏗 **Build for Production**
```bash
yarn build
```

### 🚀 **Run in Production Mode**
```bash
yarn start:prod
```

---

## 🤝 Contribution Guidelines

1. **Fork the repository**
2. **Create a new branch** for your feature
3. **Commit your changes** with a clear message
4. **Push to your branch** and create a Pull Request (PR)
5. **Wait for the review** and merge 🎉

---

## 📜 License

This project is **MIT Licensed**.

---

## 💡 Need Help?

If you have any questions or issues, feel free to reach out or open a GitHub Issue! 🚀

