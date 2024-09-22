import React from 'react';
import AdminCarManagement from '../components/AdminCarManagement.js';
import AdminOrders from '../components/AdminOrderManagement.js';
import SalesReport from '../components/AdminSalesReport.js';
import AdminUserManagement from '../components/AdminUserManagement.js'
const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = React.useState('cars');

  const renderContent = () => {
    switch (selectedTab) {
      case 'users':
        return <AdminUserManagement />
      case 'cars':
        return <AdminCarManagement />;
      case 'orders':
        return <AdminOrders />;
      case 'sales':
        return <SalesReport />;
      default:
        return <AdminUserManagement />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Admin Dashboard</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`${selectedTab === 'users' ? 'bg-blue-500' : 'bg-gray-200'
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          onClick={() => setSelectedTab('users')}
        >
          User Management
        </button>
        <button
          className={`${selectedTab === 'cars' ? 'bg-blue-500' : 'bg-gray-200'
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          onClick={() => setSelectedTab('cars')}
        >
          Car Management
        </button>
        <button
          className={`${selectedTab === 'orders' ? 'bg-blue-500' : 'bg-gray-200'
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          onClick={() => setSelectedTab('orders')}
        >
          Order Management
        </button>

        <button
          className={`${selectedTab === 'sales' ? 'bg-blue-500' : 'bg-gray-200'
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          onClick={() => setSelectedTab('sales')}
        >
          Sales Report
        </button>

      </div>

      <div>{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
