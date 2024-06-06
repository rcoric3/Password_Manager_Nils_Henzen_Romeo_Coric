import React from "react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const username = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-2">
            Welcome to Your Dashboard!
          </h1>
          <p className="text-2xl">Hello, {username}!</p>
        </div>
      </div>
      <div className="container mx-auto p-4 flex-grow">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Password
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div></div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div></div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div></div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div></div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Logout
      </button>
    </div>
  );
}
