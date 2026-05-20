import React from 'react';

export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
        <Icon size={32} className="text-zinc-500" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed mb-6">
        {description}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
};
