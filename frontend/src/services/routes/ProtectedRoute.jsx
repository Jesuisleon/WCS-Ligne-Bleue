import React from "react";
import NotFound404 from "../../components/NotFound404";

export default function ProtectedRoute({ status, children }) {
  if (!status) {
    return <NotFound404 />;
  }
  return children;
}
