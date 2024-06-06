import React from "react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [unique_key, setUnique_key] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [, navigate] = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      alert("Both fields are required");
      return;
    }

    const sanitizeInput = (input) => {
      return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    try {
      const response = await fetch("http://localhost:4000/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: sanitizedUsername,
          user_password: sanitizedPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUnique_key(data);
        setShowPopup(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Unknown error");
      }
    } catch (error) {
      alert(error.message);
    }

    setUsername("");
    setPassword("");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(unique_key);
    alert("Unique Key copied to clipboard!");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-md">
      <h2 className="text-center text-4xl">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Register
          </button>
          <button
            type="button"
            onClick={handleLoginClick}
            className="ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md text-center">
            <h2 className="text-2xl mb-4">Registration Successful!</h2>
            <p className="mb-4">
              Your Unique Key is: <strong>{unique_key}</strong>
            </p>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Copy Unique Key
            </button>
            <button
              onClick={handleDashboardClick}
              className="ml-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
