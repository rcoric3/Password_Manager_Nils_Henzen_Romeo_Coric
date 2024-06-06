import React from "react";
import { Route, useLocation } from "wouter";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [, setLocation] = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    setLocation("/login");
    return null;
  }

  return <Route {...rest} component={Component} />;
};

export default ProtectedRoute;
