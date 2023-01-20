import React from "react";
import NotFound404 from "./NotFound404";

export default function ProtectedRoute({ status, children }) {
  if (!status) {
    return <NotFound404 />;
  }
  return children;
}
