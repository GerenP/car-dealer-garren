import { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'John Doe',
      car: { name: 'Toyota Camry' },
      orderDate: '2024-01-15T00:00:00Z',
      status: 0,
    },
    {
      id: 2,
      customer: 'Jane Smith',
      car: { name: 'Honda Accord' },
      orderDate: '2024-01-18T00:00:00Z',
      status: 1,
    },
    {
      id: 3,
      customer: 'Alice Johnson',
      car: { name: 'Tesla Model 3' },
      orderDate: '2024-01-20T00:00:00Z',
      status: 2,
    },
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllOrders();
        setOrders(response);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setError("Failed to load orders. Please try again later.");
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    await orderService.updateOrderStatus(orderId, newStatus);
    const updatedOrders = await orderService.getAllOrders();
    setOrders(updatedOrders);
  };

  return (
    <div className="container mx-auto p-6 bg-white">
      <header className="flex items-center justify-between mb-6 bg-blue-500 text-white shadow-lg rounded-lg p-5">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg">Add Order</button>
      </header>

      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Customer Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Car</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Order Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-gray-100 hover:bg-gray-200 transition-colors">
              <td className="border px-6 py-4 text-gray-800">{order.customer}</td>
              <td className="border px-6 py-4 text-gray-800">{order.car.name}</td>
              <td className="border px-6 py-4 text-gray-800">{new Date(order.orderDate).toLocaleDateString()}</td>
              <td className="border px-6 py-4">
                <span className={`font-bold ${order.status === 0 ? 'text-yellow-500' : order.status === 1 ? 'text-blue-500' : 'text-green-500'}`}>
                  {order.status === 0 ? 'Processing' : order.status === 1 ? 'Delivering' : 'Delivered'}
                </span>
              </td>
              <td className="border px-6 py-4">
                <button
                  className={`text-white font-bold py-1 px-3 rounded-lg mr-2 transition duration-200 ${order.status === 2 ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
                  onClick={() => updateOrderStatus(order.id, order.status + 1)}
                  disabled={order.status === 2}
                >
                  Next Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
