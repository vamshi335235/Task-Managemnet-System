const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json()); // Parse JSON payloads

// Mount Routes
// Health Check route for Render deployments
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Task API is running!' });
});

app.use('/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Global Error Handler Middleware
// Must be used after all routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
