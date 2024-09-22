import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS for animation
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.login({ username, password });
      const { role } = response;
      navigate(role === 'Admin' ? '/admin' : '/catalog');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div
        className="container max-w-lg" // Max width constraint for large screens
        data-aos="fade-up"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Subtle transparency for PC elegance
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', // Smooth shadow for modern look
        }}
      >
        <div className="row justify-content-center">
          <div className="col-12">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                Welcome Back!
              </h2>

              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="form-group">
                  <label className="text-gray-700 font-semibold">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="form-group relative">
                  <label className="text-gray-700 font-semibold">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary absolute right-3 top-8"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="w-full btn btn-primary py-2 text-white font-bold rounded-lg transition transform hover:scale-105"
                  >
                    Sign In
                  </button>
                </div>
              </form>

              <div className="text-center mt-4">
                <span className="text-gray-600">Don't have an account?</span>
                <button
                  type="button"
                  onClick={handleRegisterRedirect}
                  className="btn btn-link text-indigo-600 font-semibold"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
