const Task = require('../models/Task');

/**
 * @desc    Get all tasks for the logged in user with filtering, search, sort, and pagination
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sort, page = 1, limit = 9 } = req.query;

    const query = { userId: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: 'i' };

    // Set sorting direction based on parameters
    let sortOption = { createdAt: -1 }; // Default mapping
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'dueDateAsc') {
      sortOption = { dueDate: 1 }; // Earliest deadlines first
    } else if (sort === 'dueDateDesc') {
      sortOption = { dueDate: -1 }; // Furthest deadlines first
    }

    // Pagination calculations
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch targeted tasks and total document pipeline concurrently
    const [tasks, total] = await Promise.all([
      Task.find(query).sort(sortOption).skip(skip).limit(limitNumber),
      Task.countDocuments(query)
    ]);
    
    // Output comprehensive pagination envelope
    res.status(200).json({
      tasks,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limitNumber)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Task title is required');
    }

    // Create the task linked to the logged-in user's ID
    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a task completely
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Ensure the currently logged-in user matches the task's user
    if (task.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to update this task');
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated document and apply validations
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Validate ownership before deletion
    if (task.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to delete this task');
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a task status specifically to "Done"
 * @route   PATCH /api/tasks/:id/complete
 * @access  Private
 */
const markTaskCompleted = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Check authorization
    if (task.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to update this task');
    }

    task.status = 'Done';
    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get task analytics for the logged in user
 * @route   GET /api/tasks/analytics
 * @access  Private
 */
const getTaskAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Run count queries concurrently for performance
    const [total, completed, pending] = await Promise.all([
      Task.countDocuments({ userId }),
      Task.countDocuments({ userId, status: 'Done' }),
      Task.countDocuments({ userId, status: { $ne: 'Done' } }),
    ]);

    let completionRate = 0;
    if (total > 0) {
      completionRate = Number(((completed / total) * 100).toFixed(2));
    }

    res.status(200).json({
      total,
      completed,
      pending,
      completionRate,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskCompleted,
  getTaskAnalytics,
};
