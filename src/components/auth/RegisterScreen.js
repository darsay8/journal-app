import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const [checkError, setCheckError] = useState(false);

  const [formValues, handleInputChange] = useForm({
    name: 'user',
    email: 'user@mail.com',
    password: '123456',
    password2: '123456',
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = e => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (validator.isEmpty(name)) {
      dispatch(setError('Name is required'));
      setCheckError(true);
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      setCheckError(true);
      return false;
    } else if (!validator.equals(password, password2) || password.length < 5) {
      dispatch(setError('Should be at least 6 characters and match each other'));
      setCheckError(true);
      return false;
    } else {
      dispatch(removeError());
      return true;
    }
  };

  return (
    <div>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister} className="animate__animated animate__fadeIn animate__faster">
        {msgError && (
          <div className="auth__alert-error animate__animated animate__headShake">{msgError}</div>
        )}
        <input
          type="name"
          placeholder="Name"
          name="name"
          autoComplete="off"
          className="auth__input"
          value={name}
          onChange={handleInputChange}
        />

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

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <div className="mt-1">
          <Link to="/auth/login" className="link">
            Already Registered?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
