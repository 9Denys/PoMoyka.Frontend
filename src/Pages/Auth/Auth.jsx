import './Auth.css';
import { images } from '../../assets/image';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userRole', data.user.role);

      localStorage.setItem('userFirstName', data.user.firstName || '');

      console.log('Successful entrance:', data.user);

      if (data.user.role === 'admin' || data.user.role === 'Admin') {
        navigate('/admin/employers');
      } else if (data.user.role === 'employee' || data.user.role === 'Employee') {
        navigate('/worker/myinfo');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error at login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-left-side">
          <h2 className="auth-title">AUTHORIZATION</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="auth-label">Email</label>
            <input
              type="email"
              id="email"
              className="auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="auth-label">Password</label>
            <input
              type="password"
              id="password"
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="auth-error">{error}</p>}

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'SIGN IN…' : 'SIGN IN'}
            </button>
          </form>

          <p className="auth-terms">
            I agree to the <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>
          </p>
        </div>

        <div className="auth-right-side">
          <img src={images.adminIcon} alt="Admin Icon" className="auth-image" onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
}

export default Auth;
