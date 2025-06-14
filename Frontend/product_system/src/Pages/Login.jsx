import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to the login API
      const response = await axios.post(
        "http://localhost:5000/api/users/login", // Backend login endpoint
        {
          email,
          password,
        }
      );

      // Store the JWT token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to the dashboard page
      navigate("/dashboard");
    } catch (err) {
      // Display error if login fails
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 text-center">Login</h2>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Show error message if login fails */}
          {error && <p className="text-danger text-center">{error}</p>}

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Link to Signup page */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
