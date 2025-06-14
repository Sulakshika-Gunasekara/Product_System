import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 text-center">Create an account</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="form-control"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-control"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {/* Display error message */}
          {error && <p className="text-danger text-center">{error}</p>}
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        {/* Link to Login */}
        <p className="mt-3 text-center text-muted">
          Already have an account?{" "}
          <a href="/" className="text-primary">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
