import React, { useState } from 'react';
import './signupForm.css';

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    password: '',
    passwordMatch: '',
    email: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formValues.name) {
      newErrors.name = 'Name is required';
    }

    // Password validation
    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (formValues.passwordMatch !== formValues.password) {
      newErrors.passwordMatch = 'Passwords must match';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formValues.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Terms acceptance validation
    if (!formValues.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data:', formValues);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-container">
      <form className="custom-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">NAME:</label>
          <input
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORD:</label>
          <input
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="passwordMatch">CONFIRM PASSWORD:</label>
          <input
            name="passwordMatch"
            type="password"
            value={formValues.passwordMatch}
            onChange={handleChange}
          />
          {errors.passwordMatch && <span className="error">{errors.passwordMatch}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">EMAIL:</label>
          <input
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="acceptTerms">
            <input
              name="acceptTerms"
              type="checkbox"
              checked={formValues.acceptTerms}
              onChange={handleChange}
            />
            ACCEPT TERMS AND CONDITIONS:
          </label>
          {errors.acceptTerms && <span className="error">{errors.acceptTerms}</span>}
        </div>

        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
};

export default RegisterForm;
