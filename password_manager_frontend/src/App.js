import React from "react";
import { Route } from "wouter";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="App">
      <Route path="/login" component={Login} />
    </div>
  );
}
