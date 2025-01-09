import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Signup.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
//   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for matching passwords
    if (password !== confirmPassword) {
      setAlert({ message: "Passwords do not match!", type: "error" });
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Corrected typo "header" to "headers"
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAlert({ message: "Account created successfully!", type: "success" });
        // setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
      } else {
        const errorData = await response.json();
        setAlert({ message: errorData.error || "Something went wrong.", type: "error" });
      }
    } catch (err) {
      console.error("Error during sign up:", err);
      setAlert({ message: "An error occurred. Please try again later.", type: "error" });
    }
  };

  return (
    <div className="signup-form">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="logo" className="logo-signup" />
          <h1>Welcome to our community!</h1>

          <div className="input-box">
            <input
              id="first-name"
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              id="last-name"
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              id="password"
              type="password"
              placeholder="Create Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">Create Account</button>

          {/* Display Alerts */}
          {alert && (
            <div className={`alert-message ${alert.type}`}>
              {alert.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
