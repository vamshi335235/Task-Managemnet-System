import React from 'react';
import { ListTodo, CheckCircle2, CircleDashed, Activity } from 'lucide-react';

const StatsCard = ({ stats }) => {
  if (!stats) return null;

  const statItems = [
    { title: 'Total Tasks', value: stats.total, icon: <ListTodo size={24} className="text-blue-500 dark:text-blue-400" />, bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { title: 'Completed', value: stats.completed, icon: <CheckCircle2 size={24} className="text-emerald-500 dark:text-emerald-400" />, bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { title: 'Pending', value: stats.pending, icon: <CircleDashed size={24} className="text-amber-500 dark:text-amber-400" />, bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { title: 'Completion Rate', value: `${stats.completionRate}%`, icon: <Activity size={24} className="text-purple-500 dark:text-purple-400" />, bg: 'bg-purple-50 dark:bg-purple-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className={`p-3 rounded-xl ${item.bg} transition-colors duration-300`}>
            {item.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">{item.title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
