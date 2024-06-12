import React from "react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await fetch("http://localhost:4000/v1/login", {
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
        localStorage.setItem(
          "token",
          JSON.stringify({
            username: data.username,
            user_id: data.user_id,
          })
        );
        navigate("/dashboard");
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
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-md">
      <h2 className="text-center text-4xl">Login</h2>
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
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
