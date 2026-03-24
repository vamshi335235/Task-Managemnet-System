import React from 'react';
import { Calendar, Edit3, Trash2, CheckCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {
  const isDone = task.status === 'Done';

  const priorityColors = {
    Low: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    High: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
  };

  const statusColors = {
    'Todo': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    'Done': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border ${isDone ? 'border-emerald-100 dark:border-emerald-900/50 opacity-70 hover:opacity-100' : 'border-gray-100 dark:border-gray-700'} hover:shadow-md transition-all duration-300 relative group flex flex-col h-full`}>
      <div className="flex justify-between items-start mb-3 gap-2">
        <h3 className={`text-lg font-bold leading-tight transition-colors duration-300 ${isDone ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
          {task.title}
        </h3>
        <div className="flex gap-1.5 shrink-0 flex-col items-end sm:flex-row">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors duration-300 ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors duration-300 ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
      </div>

      <div className="flex-1">
        {task.description && (
          <p className={`text-sm mb-5 line-clamp-3 transition-colors duration-300 ${isDone ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-auto">
        {task.dueDate && (
          <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-700/50 w-max px-2.5 py-1.5 rounded-md border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <Calendar size={14} className="mr-1.5 text-gray-400 dark:text-gray-500" />
            {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex gap-2">
            {!isDone ? (
              <button
                onClick={() => onComplete(task._id)}
                className="px-2.5 py-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-semibold"
                title="Mark as Done"
              >
                <CheckCircle size={16} /> <span className="hidden sm:inline">Mark Done</span>
              </button>
            ) : (
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold text-sm flex items-center gap-1.5 px-2 py-1 transition-colors duration-300">
                <CheckCircle size={16} /> Completed
              </span>
            )}
          </div>
          
          <div className="flex gap-1.5 flex-1 justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-500/20"
              title="Edit Task"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-500/20"
              title="Delete Task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
