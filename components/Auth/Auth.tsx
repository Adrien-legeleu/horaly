"use client";
import { useState } from "react";
import UserAuth from "./UserAuth";
import AdminAuth from "./AdminAuth";

export default function Auth() {
  const [handleUserAdminAuth, setHandleUserAdminAuth] = useState(false);
  const handleUserAdmin = () => {
    setHandleUserAdminAuth(!handleUserAdminAuth);
  };
  return (
    <div>
      <div>{handleUserAdminAuth ? <UserAuth /> : <AdminAuth />}</div>
      <p onClick={handleUserAdmin}>
        {!handleUserAdminAuth
          ? "Vous êtes un utilisateur ?"
          : "Vous êtes un administrateur ?"}
      </p>
    </div>
  );
}
