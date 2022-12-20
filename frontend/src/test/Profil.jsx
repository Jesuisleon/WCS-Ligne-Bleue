import React from "react";
import user from "./DataTest";

export default function Profil() {
  return (
    <div>
      <h1>{user[0].name}</h1>
    </div>
  );
}
