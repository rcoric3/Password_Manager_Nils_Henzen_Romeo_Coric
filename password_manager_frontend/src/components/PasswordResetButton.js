import React, { useState } from "react";
import { useLocation } from "wouter";

function ResetPasswordButton() {
  const [isResetFormVisible, setIsResetFormVisible] = useState(false);
  const [unique_key, setUnique_key] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [, navigate] = useLocation();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return null;
  };

  const handleResetClick = () => {
    setIsResetFormVisible(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (confirmation !== "confirm") {
      alert("Please type 'confirm' to reset your password");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      alert(passwordError);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/v1/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unique_key: unique_key,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        alert("Password reset successful");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Unknown error");
      }
    } catch (error) {
      alert(error.message);
    }

    setUnique_key("");
    setNewPassword("");
    setConfirmation("");
    setIsResetFormVisible(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleResetClick}
        className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
      >
        Reset Password
      </button>
      {isResetFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-center text-2xl mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="user_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unique Key:
                </label>
                <input
                  type="text"
                  id="user_id"
                  name="user_id"
                  value={unique_key}
                  onChange={(e) => setUnique_key(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type "confirm" to reset your password:
                </label>
                <input
                  type="text"
                  id="confirmation"
                  name="confirmation"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                  Reset Password
                </button>
                <button
                  type="button"
                  onClick={() => setIsResetFormVisible(false)}
                  className="ml-4 px-6 py-2 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPasswordButton;
