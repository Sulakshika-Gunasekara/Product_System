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
    console.log("Login attempt with:", { email, password: "***" });

    try {
      // Make the POST request to the login API
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      // Check if token exists in response
      if (response.data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem("authToken", response.data.token);
        console.log("Token stored in localStorage:", response.data.token);

        // Verify token was stored
        const storedToken = localStorage.getItem("authToken");
        console.log("Verified stored token:", storedToken);

        // Redirect to the dashboard page after login
        navigate("/dashboard");
      } else {
        console.error("No token in response");
        setError("Login failed - no token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response?.data);
      // Display error if login fails
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center h-100 bg-green-900"
      style={{ minHeight: "100vh", padding: "0px", width: "100vw" }}>
      <div className="card p-4 shadow" style={{ width: "500px" }}>
        <h1
          className="text-center mb-3"
          style={{ fontWeight: "bold", color: "#0d6efd" }}>
          Product Store
        </h1>
        <h2 className="mb-4 text-center">Login</h2>
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3 mt-2 shadow-lg">
            Login
          </button>
          <div className="mb-3 d-flex justify-content-between align-items-center mt-2"></div>
          <div className="text-center mt-3">
            <p className="mb-0">Don't have an account?</p>
            <span
              className="text-decoration-none text-primary "
              onClick={() => navigate("/signup")}>
              Register here
            </span>
          </div>
        </form>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
