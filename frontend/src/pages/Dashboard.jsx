import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import api from '../services/api';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
    sort: '',
  });

  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({ total: 0, pages: 1 });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [savingTask, setSavingTask] = useState(false);

  // Auto-reset pagination counter when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      
      // Construct URL parameters dynamically
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.sort) queryParams.append('sort', filters.sort);
      queryParams.append('page', page);

      const [tasksRes, statsRes] = await Promise.all([
        api.get(`/api/tasks?${queryParams.toString()}`),
        api.get('/api/tasks/analytics')
      ]);

      // Assign the encapsulated response from the backend
      setTasks(tasksRes.data.tasks);
      setPaginationInfo(tasksRes.data.pagination);
      setStats(statsRes.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
      } else {
        setError('Failed to fetch tasks. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  // Handle Debounce for search to avoid excessive API requests
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, 400); // 400ms debounce
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const handleCreateOrUpdate = async (taskData) => {
    setSavingTask(true);
    try {
      if (editingTask) {
        await api.put(`/api/tasks/${editingTask._id}`, taskData);
      } else {
        await api.post('/api/tasks', taskData);
      }
      setIsFormOpen(false);
      setEditingTask(null);
      fetchTasks(); // Refetch fully refreshes lists & analytics
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save task.');
    } finally {
      setSavingTask(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        await api.delete(`/api/tasks/${id}`);
        // Edge case: User deletes last item on current paginated view
        if (tasks.length === 1 && page > 1) {
           setPage(p => p - 1);
        } else {
           fetchTasks();
        }
      } catch (err) {
        alert('Failed to delete task.');
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.patch(`/api/tasks/${id}/complete`);
      fetchTasks();
    } catch (err) {
      alert('Failed to update task status.');
    }
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const clearFilters = () => {
    setFilters({ status: '', priority: '', search: '', sort: '' });
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Manage your tasks and boost your productivity seamlessly.</p>
          </div>
          <button
            onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <Plus size={20} />
            Create Task
          </button>
        </div>

        <StatsCard stats={stats} />
        
        <FilterBar 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onClear={clearFilters} 
        />

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium border border-red-100 flex items-center shadow-sm">
            {error}
          </div>
        )}

        {loading && tasks.length === 0 ? (
          <div className="flex justify-center items-center py-32">
            <span className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin shadow-sm"></span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-16 text-center shadow-sm max-w-2xl mx-auto mt-12 transition-colors">
            <div className="w-20 h-20 bg-blue-50 dark:bg-gray-700 text-blue-500 dark:text-blue-400 border border-blue-100 dark:border-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
              <Plus size={40} className="opacity-80" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">No tasks found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed transition-colors">
              You haven't created any tasks yet, or none match your current filters. Click "Create Task" to get started!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
              {tasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                  onComplete={handleComplete}
                />
              ))}
            </div>

            {/* Pagination Controls Extracted UI */}
            {paginationInfo.pages > 1 && (
              <div className="flex justify-center items-center gap-4 pb-20">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                  Page {page} of {paginationInfo.pages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === paginationInfo.pages}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {isFormOpen && (
        <TaskForm 
          initialData={editingTask}
          loading={savingTask}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => { setIsFormOpen(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
};

export default Dashboard;
