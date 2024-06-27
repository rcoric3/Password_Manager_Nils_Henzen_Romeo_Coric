import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ResetPasswordButton from "../components/PasswordResetButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = credentials.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

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
          <Button
            onClick={() => setIsCredentialFormVisible(true)}
            variant="contained"
            color="primary"
            className="mr-4"
          >
            {editCredentialId ? "Edit Entry" : "Create Entry"}
          </Button>
          <Button
            onClick={() => setIsCategoryFormVisible(true)}
            variant="contained"
            color="primary"
          >
            Create Category
          </Button>

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
                <TextField
                  label="Site URL"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Username"
                  value={credentialUsername}
                  onChange={(e) => setCredentialUsername(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Notes"
                  value={siteNotes}
                  onChange={(e) => setSiteNotes(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </div>
              <Button
                onClick={handleCreateOrUpdateCredential}
                variant="contained"
                color="primary"
              >
                {editCredentialId ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => setIsCredentialFormVisible(false)}
                variant="contained"
                className="ml-2"
              >
                Cancel
              </Button>
            </div>
          )}

          {isCategoryFormVisible && (
            <div className="p-4 bg-white rounded-md mt-4">
              <h2 className="text-xl font-bold mb-2">Create New Category</h2>
              <div className="mb-4">
                <TextField
                  label="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  fullWidth
                />
              </div>
              <Button
                onClick={handleCreateNewCategory}
                variant="contained"
                color="primary"
              >
                Create Category
              </Button>
              <Button
                onClick={() => setIsCategoryFormVisible(false)}
                variant="contained"
                className="ml-2"
              >
                Cancel
              </Button>
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
            <TextField
              label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              className="mb-4"
            />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "site_url"}
                        direction={sortConfig.direction}
                        onClick={() => handleSort("site_url")}
                      >
                        Site URL
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "username"}
                        direction={sortConfig.direction}
                        onClick={() => handleSort("username")}
                      >
                        Username
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "user_password"}
                        direction={sortConfig.direction}
                        onClick={() => handleSort("user_password")}
                      >
                        Password
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "user_email"}
                        direction={sortConfig.direction}
                        onClick={() => handleSort("user_email")}
                      >
                        Email
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "site_notes"}
                        direction={sortConfig.direction}
                        onClick={() => handleSort("site_notes")}
                      >
                        Notes
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((credential) => (
                    <TableRow key={credential.credential_id}>
                      <TableCell>{credential.site_url}</TableCell>
                      <TableCell>
                        {Array.isArray(credential.username)
                          ? credential.username.join(", ")
                          : credential.username}
                      </TableCell>
                      <TableCell>{credential.user_password}</TableCell>
                      <TableCell>{credential.user_email}</TableCell>
                      <TableCell>{credential.site_notes}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleEditCredential(credential)}
                          variant="contained"
                          color="secondary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            handleDeleteCredential(credential.credential_id)
                          }
                          variant="contained"
                          color="error"
                          className="ml-2"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              className="mt-4"
            />
          </div>
        </div>
      </div>
      <div className="bg-blue-600 text-white py-4 text-center">
        <Button onClick={handleLogout} variant="contained" color="error">
          Logout
        </Button>
      </div>
    </div>
  );
}
