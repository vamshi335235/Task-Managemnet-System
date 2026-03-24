# 🚀 Complete Deployment Guide: Vercel & Render

I have already injected the necessary dynamic routing configurations (`VITE_API_URL`) and `vercel.json` rewrites into your codebase without breaking your local development setup.

Follow these steps exactly to get your full-stack project live on the internet!

---

## Step 1: Push Code to GitHub
Both Vercel and Render deploy automatically straight from your GitHub repository.
1. Go to GitHub and create a new repository (e.g., `task-manager-assignment`).
2. Open your terminal at the root of your project folder (`full stack project`).
3. Run the following commands:
```bash
git init
git add .
git commit -m "Initial commit - Ready for deployment"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

*(Note: Ensure you have a `.gitignore` file that hides `node_modules/` and `.env` files).*

---

## Step 2: Set up MongoDB Atlas (Cloud Database)
Your local database (`127.0.0.1`) won't work on the internet. You need a free cloud database.
1. Go to **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)** and create a free account.
2. Build a free **M0 Cluster**.
3. Under **Database Access**, create a user (e.g., `admin`) and copy the auto-generated password.
4. Under **Network Access**, click `Add IP Address` and select **"Allow Access from Anywhere"** (`0.0.0.0/0`).
5. Click **Connect** -> **Drivers** -> Copy the connection string.
   *(It will look like: `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/task-manager?retryWrites=true&w=majority`)*

---

## Step 3: Deploy the Backend (Render)
Render is an excellent free host for Node.js backends.
1. Go to **[Render.com](https://render.com/)**, log in with GitHub, and click **New +** -> **Web Service**.
2. Select **"Build and deploy from a Git repository"** and connect your GitHub repo.
3. Configure the service:
   - **Name**: `task-manager-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Scroll down to **Environment Variables** and add:
   - `MONGO_URI` : Paste your MongoDB Atlas string here.
   - `JWT_SECRET` : A random long string (e.g., `super_secret_assignment_key_2026`).
   - `NODE_ENV` : `production`
5. Click **Create Web Service**. 
6. Wait 2-3 minutes for the build to finish. Once live, copy your Render URL at the top left (it will look like `https://task-manager-api-xxxx.onrender.com`).

---

## Step 4: Deploy the Frontend (Vercel)
Vercel is the fastest and easiest way to host React/Vite apps.
1. Go to **[Vercel.com](https://vercel.com/)**, log in with GitHub, and click **Add New** -> **Project**.
2. Import your GitHub repository.
3. Configure the project:
   - **Framework Preset**: Should auto-detect as **Vite**.
   - **Root Directory**: Click "Edit" and choose `frontend`.
4. Open the **Environment Variables** dropdown and add:
   - **Name**: `VITE_API_URL`
   - **Value**: Paste your Render Backend URL here (e.g., `https://task-manager-api-xxxx.onrender.com`).
5. Click **Deploy**.

---

## 🎉 You're Live!
Once Vercel finishes deploying, click the **Visit** button.
Your frontend is now correctly pointing to your cloud backend, which is successfully authenticating against your cloud MongoDB database!

*Everything has been pre-configured in your code to make this integration seamless.*
