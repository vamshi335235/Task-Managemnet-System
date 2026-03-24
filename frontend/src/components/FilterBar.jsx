import React from 'react';
import { Search, Filter, SortDesc } from 'lucide-react';

const FilterBar = ({ filters, onFilterChange, onClear }) => {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const hasActiveFilters = filters.search || filters.status || filters.priority || filters.sort;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6 flex flex-col xl:flex-row gap-4 items-center transition-colors">
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          name="search"
          placeholder="Search task by title..."
          value={filters.search}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none transition-all text-sm"
        />
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full xl:w-auto items-center">
        <div className="relative flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Filter size={16} />
          </div>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full pl-9 pr-8 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <option value="">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 w-full sm:w-32"
        >
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="relative flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <SortDesc size={16} />
          </div>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-full pl-9 pr-8 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <option value="">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="dueDateAsc">Due Earliest</option>
            <option value="dueDateDesc">Due Furthest</option>
          </select>
        </div>
        
        {hasActiveFilters && (
          <button 
            onClick={onClear}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 font-medium px-2 transition-colors shrink-0"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
