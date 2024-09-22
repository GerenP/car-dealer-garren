import { useEffect, useState } from 'react';
import { carService } from '../services/carService';
import { authService } from '../services/authService'; // Import your auth service
import 'aos/dist/aos.css'; // AOS animation styles
import AOS from 'aos'; // AOS for animation
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import { useNavigate } from 'react-router-dom';

const AdminCarManagement = () => {
  const [cars, setCars] = useState([]);
  const [carForm, setCarForm] = useState({
    name: '',
    brand: '',
    prodYear: '',
    price: '',
    stock: '',
    pic: ''
  });
  const [editingCar, setEditingCar] = useState(null);
  const navigate = useNavigate();

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await carService.getAllCars();
      setCars(response);
    };
    fetchCars();
  }, []);

  const handleInputChange = (e) => {
    setCarForm({ ...carForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCar) {
      await carService.updateCar(editingCar.id, carForm);
    } else {
      await carService.addCar(carForm);
    }
    const updatedCars = await carService.getAllCars();
    setCars(updatedCars);
    setEditingCar(null);
    setCarForm({
      name: '',
      brand: '',
      prodYear: '',
      price: '',
      stock: '',
      pic: ''
    });
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setCarForm({
      name: car.name,
      brand: car.brand,
      prodYear: new Date(car.prodYear).toISOString().split('T')[0], // Format date for input
      price: car.price,
      stock: car.stock,
      pic: car.pic
    });
  };

  const handleDelete = async (id) => {
    await carService.deleteCar(id);
    const updatedCars = await carService.getAllCars();
    setCars(updatedCars);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
};

  return (
    <div className="min-h-screen bg-light">
      {/* Header with logo */}
      <header className="bg-primary text-white p-4 d-flex justify-content-between align-items-center shadow-sm">
        <div className="d-flex align-items-center">
          <img src="https://via.placeholder.com/50" alt="Logo" className="me-3" />
          <h1 className="h3 mb-0">Car Management Admin</h1>
        </div>
        <div>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Form Section */}
      <div className="container mt-5">
        <div className="bg-white p-4 rounded shadow-sm" data-aos="fade-up">
          <h2 className="h4 mb-4">{editingCar ? 'Edit Car' : 'Add New Car'}</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                value={carForm.name}
                onChange={handleInputChange}
                placeholder="Car Name"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="brand"
                value={carForm.brand}
                onChange={handleInputChange}
                placeholder="Brand"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="date"
                name="prodYear"
                value={carForm.prodYear}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="price"
                value={carForm.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="stock"
                value={carForm.stock}
                onChange={handleInputChange}
                placeholder="Stock"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="pic"
                value={carForm.pic}
                onChange={handleInputChange}
                placeholder="Picture URL"
                className="form-control"
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                {editingCar ? 'Update Car' : 'Add Car'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="container mt-5" data-aos="fade-up">
        <table className="table table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Car Code</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.brand}</td>
                <td>{new Date(car.prodYear).getFullYear()}</td>
                <td>${car.price}</td>
                <td>{car.stock}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(car)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(car.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCarManagement;
