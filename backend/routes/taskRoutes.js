const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskCompleted,
  getTaskAnalytics,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Protect all task routes using the auth middleware
router.use(protect);

// GET /api/tasks/analytics (Must be placed before /:id routes)
router.get('/analytics', getTaskAnalytics);

// GET /api/tasks and POST /api/tasks
router.route('/')
  .get(getTasks)
  .post(createTask);

// PUT /api/tasks/:id and DELETE /api/tasks/:id
router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

// PATCH /api/tasks/:id/complete
router.patch('/:id/complete', markTaskCompleted);

module.exports = router;
