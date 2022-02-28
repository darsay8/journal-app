import React from 'react';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  return (
    <div>
      <h3 className="auth__title">Register</h3>
      <form className="animate__animated animate__fadeIn animate__faster">
        <input
          type="name"
          placeholder="Name"
          name="name"
          autoComplete="off"
          className="auth__input"
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          className="auth__input"
        />

        <input type="password" placeholder="Password" name="password" className="auth__input" />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
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
