import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you want navigation after registration
import { authService } from '../services/authService';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS for animation
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    role: 'User',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for redirecting

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      navigate('/'); // Redirect to homepage after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div
        className="container max-w-lg"
        data-aos="fade-up"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Create Your Account
        </h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="text-gray-700 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-gray-700 font-semibold">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="form-control py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="w-full btn btn-primary py-2 text-white font-bold rounded-lg transition transform hover:scale-105"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account?</span>
          <a
            href="/login"
            className="btn btn-link text-indigo-600 font-semibold"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
