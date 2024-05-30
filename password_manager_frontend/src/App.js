import React from "react";
import { Route } from "wouter";
import "./input.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="App">
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/register" component={Register} />
    </div>
  );
}
