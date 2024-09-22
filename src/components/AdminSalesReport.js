import { useState } from 'react';
import { reportService } from '../services/salesService.js';

const SalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null);

  const fetchSalesReport = async () => {
    const response = await reportService.getSalesReport(startDate, endDate);
    setReport(response);
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-sm">
        <h1 className="h3 mb-0">Sales Report</h1>
      </header>

      {/* Form Section */}
      <div className="container mt-5">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="h4 mb-4">Generate Report</h2>
          <div className="flex space-x-4 mb-6 items-center">
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="startDate">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="endDate">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={fetchSalesReport}
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Summary Section */}
      {report && (
        <div className="container mt-5">
          <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="h4 mb-4">Report Summary</h2>
            <p className="font-bold">Total Cars Sold: {report.totalSales}</p>
            <p className="font-bold">Total Revenue: ${report.totalRevenue}</p>

            <table className="min-w-full bg-white border border-gray-200 mt-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Car</th>
                  <th className="py-2 px-4 border-b">Customer</th>
                  <th className="py-2 px-4 border-b">Order Date</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.orders.map((sale, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{sale.car.name}</td>
                    <td className="py-2 px-4 border-b">{sale.user.name}</td>
                    <td className="py-2 px-4 border-b">{new Date(sale.orderDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">${sale.car.price}</td>
                    <td className="py-2 px-4 border-b">
                      {sale.status === 1 ? 'Processed' : sale.status === 2 ? 'Shipped' : 'Completed'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
