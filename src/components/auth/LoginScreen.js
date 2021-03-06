// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.ui);
  const { msgError } = useSelector(state => state.ui);
  // const [checkError, setCheckError] = useState(false);

  const [formValues, handleInputChange] = useForm({ email: 'user@mail.com', password: '123456' });

  const { email, password } = formValues;

  const handleLogin = e => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    // console.log('hey');
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      // setCheckError(true);
      return false;
    } else if (validator.isEmpty(password)) {
      dispatch(setError('Password is required'));
      // setCheckError(true);
      return false;
    } else {
      dispatch(removeError());
      return true;
    }
  };

  return (
    <div>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster">
        {msgError && (
          <div className="auth__alert-error animate__animated animate__headShake">{msgError}</div>
        )}
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          className="auth__input"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <div className="mt-1">
          <Link to="/auth/register" className="link">
            Create new account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
