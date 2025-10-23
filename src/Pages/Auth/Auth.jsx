import './Auth.css';
import { images } from '../../assets/image';

function Auth() {
  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-left-side">
          <h2 className="auth-title">AUTHORIZATION</h2>
          <form className="auth-form">
            <label htmlFor="email" className="auth-label">Email</label>
            <input type="email" id="email" className="auth-input" placeholder="Enter your email" />

            <label htmlFor="password" className="auth-label">Password</label>
            <input type="password" id="password" className="auth-input" placeholder="Enter your password" />

            <button type="submit" className="auth-button">SIGN IN</button>
          </form>
          <p className="auth-terms">
            I agree to the <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>
          </p>
        </div>

        <div className="auth-right-side">
          <img src={images.adminIcon} alt="Admin Icon" className="auth-image" />
        </div>
      </div>
    </div>
  );
}

export default Auth;