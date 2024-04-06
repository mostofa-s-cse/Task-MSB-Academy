import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p>Put your analytics here...</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>
          <p>Put your tasks here...</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
