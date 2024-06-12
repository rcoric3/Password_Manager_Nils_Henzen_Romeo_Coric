import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ResetPasswordButton from "../components/PasswordResetButton";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const token = JSON.parse(localStorage.getItem("token"));
  const username = token ? token.username : "";
  const userId = token ? token.user_id : null;

  const [siteUrl, setSiteUrl] = useState("");
  const [credentialUsername, setCredentialUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [siteNotes, setSiteNotes] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [credentials, setCredentials] = useState([]);
  const [editCredentialId, setEditCredentialId] = useState(null);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCredentialFormVisible, setIsCredentialFormVisible] = useState(false);
  const [isCategoryFormVisible, setIsCategoryFormVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/get/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Error fetching categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCredentials = async () => {
    console.log(selectedCategoryId);
    try {
      const requestBody = {
        user_id: userId,
        category_id:
          selectedCategoryId || null
            ? parseInt(selectedCategoryId || null)
            : undefined,
      };
      const response = await fetch(
        "http://localhost:4000/v1/user/credentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCredentials(data);
      } else {
        console.error("Error fetching credentials");
      }
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCredentials();
  }, [selectedCategoryId]);

  const handleCreateOrUpdateCredential = async () => {
    const credentialData = {
      site_url: siteUrl,
      username: credentialUsername,
      user_password: userPassword,
      site_notes: siteNotes,
      user_email: userEmail,
      category_id: parseInt(selectedCategoryId),
      user_id: userId,
    };

    try {
      let response;
      if (editCredentialId) {
        credentialData.credential_id = editCredentialId;
        response = await fetch("http://localhost:4000/v1/credentials", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialData),
        });
      } else {
        response = await fetch("http://localhost:4000/v1/credentials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialData),
        });
      }

      if (response.ok) {
        alert(
          editCredentialId
            ? "Credential updated successfully"
            : "New credential created successfully"
        );
        setSiteUrl("");
        setCredentialUsername("");
        setUserPassword("");
        setSiteNotes("");
        setUserEmail("");
        setEditCredentialId(null);
        setIsCredentialFormVisible(false);
        fetchCredentials();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Unknown error");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditCredential = (credential) => {
    setEditCredentialId(credential.credential_id);
    setSiteUrl(credential.site_url);
    setCredentialUsername(credential.username);
    setUserPassword(credential.user_password);
    setSiteNotes(credential.site_notes);
    setUserEmail(credential.user_email);
    setSelectedCategoryId(credential.category_id.toString());
    setIsCredentialFormVisible(true);
  };

  const handleDeleteCredential = async (credential_id) => {
    try {
      const response = await fetch("http://localhost:4000/v1/credentials", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential_id }),
      });

      if (response.ok) {
        alert("Credential deleted successfully");
        fetchCredentials();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Unknown error");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCreateNewCategory = async () => {
    if (newCategoryName.trim() === "") {
      alert("Category name cannot be empty");
      return;
    }

    const newCategory = {
      user_id: userId,
      category_name: newCategoryName,
    };

    try {
      const response = await fetch("http://localhost:4000/v1/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        alert("New category created successfully");

        const data = await response.json();
        setCategories([...categories, data]);
        setNewCategoryName("");
        setIsCategoryFormVisible(false);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Unknown error");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    await setSelectedCategoryId(categoryId);
    fetchCredentials();
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <ResetPasswordButton />
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
          <button
            onClick={() => setIsCredentialFormVisible(true)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 mr-4"
          >
            {editCredentialId ? "Edit Entry" : "Create Entry"}
          </button>
          <button
            onClick={() => setIsCategoryFormVisible(true)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Create Category
          </button>

          {isCredentialFormVisible && (
            <div className="p-4 bg-white rounded-md mt-4">
              <h2 className="text-xl font-bold mb-2">
                {editCredentialId ? "Edit Entry" : "Create New Entry"}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md col-span-2"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Site URL"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={credentialUsername}
                  onChange={(e) => setCredentialUsername(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Notes"
                  value={siteNotes}
                  onChange={(e) => setSiteNotes(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md col-span-2"
                />
              </div>
              <button
                onClick={handleCreateOrUpdateCredential}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                {editCredentialId ? "Update" : "Create"}
              </button>
              <button
                onClick={() => setIsCredentialFormVisible(false)}
                className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 ml-2"
              >
                Cancel
              </button>
            </div>
          )}

          {isCategoryFormVisible && (
            <div className="p-4 bg-white rounded-md mt-4">
              <h2 className="text-xl font-bold mb-2">Create New Category</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <button
                onClick={handleCreateNewCategory}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                Create Category
              </button>
              <button
                onClick={() => setIsCategoryFormVisible(false)}
                className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 ml-2"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Filter by Category</h2>
            <select
              value={selectedCategoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Your Entries</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Site URL</th>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">Password</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Notes</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {credentials.map((credential) => (
                  <tr key={credential.credential_id}>
                    <td className="py-2 px-4 border-b">
                      {credential.site_url}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {credential.username}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {credential.user_password}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {credential.user_email}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {credential.site_notes}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEditCredential(credential)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteCredential(credential.credential_id)
                        }
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-blue-600 text-white py-4 text-center">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
