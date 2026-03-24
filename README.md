# 🚀 Task Management System

A robust, full-stack Task Management System built using the MERN stack. Designed to help users efficiently organize, track, and gain visual insights into their daily tasks with a clean and responsive UI.

## 💻 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)

## ✨ Features Implemented

### 1. Authentication
- User Signup & Login securely handling passwords.
- JWT-based authentication for persistent sessions.
- Protected frontend routes preventing unauthorized access.

### 2. Task Management
- **Create:** Add new tasks with specific details.
- **Read:** View all associated tasks on a centralized dashboard.
- **Update:** Modify existing task properties.
- **Delete:** Permanently remove tasks.
- **Complete:** Quick-action button to mark tasks as "Done".
- **Task Fields:** Title, Description, Status (Todo, In Progress, Done), Priority (Low, Medium, High), and Due Date.

### 3. Filtering & Search
- Filter tasks dynamically by **Status** or **Priority**.
- **Search** functionality to quickly find tasks by title.

### 4. Analytics
- Automatically calculates and displays:
  - Total tasks
  - Completed tasks
  - Pending tasks
  - Completion percentage

### 5. UI Features
- Clean, modern, and fully responsive user interface.
- Dashboard with dedicated visual analytics cards.
- Interactive, responsive Task list view.
- Floating form modal for creating/updating tasks.
- Comprehensive loading spinners and graceful error state handling.

### 6. Technical Highlights
- Strict **MVC (Model-View-Controller)** architecture in the backend.
- Centralized **Global error handling middleware**.
- Secure APIs utilizing JWT Verification middleware.
- Optimized MongoDB queries utilizing indexing for performance.
- Custom **Axios interceptor** instantly attaching tokens to outbound requests.

---

## 📂 Folder Structure Overview

```text
task-management-system/
├── backend/
│   ├── config/          # MongoDB connectivity
│   ├── controllers/     # API logic and task CRUD operations
│   ├── middleware/      # JWT Auth and Global Error Handlers
│   ├── models/          # User and Task Mongoose Schemas
│   ├── routes/          # Express route definitions
│   └── server.js        # Main entry point and Express setup
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI (Navbar, TaskCard, FilterBar, StatsCard, TaskForm)
    │   ├── pages/       # Core views (Dashboard, Login, Signup)
    │   ├── services/    # Axios API instance and interceptors
    │   ├── App.jsx      # React Router protected route setup
    │   └── main.jsx     # React DOM render
    ├── tailwind.config.js
    └── index.html
```

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI.

### 1. Backend Setup
Open a terminal and navigate into the `backend` directory:
```bash
cd backend
npm install
```

Start the backend development server:
```bash
npm run dev
```
*(The backend runs on http://localhost:5000)*

### 2. Frontend Setup
Open a new terminal window and navigate into the `frontend` directory:
```bash
cd frontend
npm install
```

Start the Vite development compiler:
```bash
npm run dev
```
*(Navigate to http://localhost:5173 to view the application)*

---

## 🔐 Environment Variables (.env)

Create a `.env` file inside the root of the **`backend`** folder and add the following configuration:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/task_manager_db
JWT_SECRET=your_super_secret_jwt_key
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/auth/signup` | Register a new user | No |
| **POST** | `/auth/login` | Authenticate user & get token | No |
| **GET** | `/api/tasks` | Get filtered/searched tasks | Yes |
| **GET** | `/api/tasks/analytics`| Get dashboard task statistics | Yes |
| **POST** | `/api/tasks` | Create a new task | Yes |
| **PUT** | `/api/tasks/:id` | Update an existing task | Yes |
| **PATCH**| `/api/tasks/:id/complete`| Mark task status as "Done" | Yes |
| **DELETE**| `/api/tasks/:id` | Delete a specific task | Yes |

---

## 📸 Screenshots

> *[Placeholder: Insert Screenshot of the Login and Signup pages here]*

> *[Placeholder: Insert Screenshot of the Main Dashboard with Analytics Cards here]*

> *[Placeholder: Insert Screenshot of the Task Creation/Update Modal here]*

---

## 🚀 Deployment

- **Frontend Live URL:** [Placeholder: Insert Vercel / Netlify Link Here]
- **Backend API URL:** [Placeholder: Insert Render / Heroku Link Here]

---

## 📐 Design Decisions

- **Separation of Concerns:** Adopted the MVC framework pattern to ensure a clean structural separation between database models, API routing, and business logic.
- **Client-Side Interceptors:** Utilized Axios request interceptors to abstract JWT token management away from individual React components, ensuring highly secure API requests without repetitive boilerplate code.
- **Database-Side Analytics:** Offloaded computation for metrics (completed/pending counts) to MongoDB's `countDocuments()` engine instead of relying on heavy client-side array mapping. This guarantees UI scalability even as thousands of tasks are created.
- **Global Error Handling:** Designed a unified Express error middleware that gracefully catches database or validation errors and formats them into predictable, frontend-friendly JSON payloads.

---

## 🔮 Future Improvements

- **Interactive Kanban Board:** Implement drag-and-drop functionality to allow users to visually transition tasks between "Todo", "In Progress", and "Done" columns.
- **Team Collaboration Elements:** Expand the User model to allow task assignments to multiple verified users or shared collaborative workspaces.
- **Automated Email Reminders:** Integrate NodeMailer/Cron Jobs to dispatch automated alerts to users when a High Priority task nears its Due Date.
- **File Attachments:** Connect an AWS S3 bucket to allow users to securely upload contextual documents or images to individual tasks.
