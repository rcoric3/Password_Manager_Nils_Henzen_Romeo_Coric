import React from "react";
import { Route, Switch } from "wouter";
import "./input.css";
import ProtectedRoute from "./protected/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

export default function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
    </Switch>
  );
}
