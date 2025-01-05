"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignIn from "./sign-in";

export default function AdminAuth() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [adminPassword, setAdminPassword] = useState("");

  const handlePasswordSubmit = async () => {
    try {
      console.log(adminPassword);

      const res = await fetch("/api/admin/check-admin-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: adminPassword }),
      });
      console.log("res", res);
      if (res.ok) {
        setIsPasswordValid(true);
      } else {
        console.error("Invalid Password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const createAdmin = async (userEmail: string) => {
    try {
      const res = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      console.log("res", res);
      if (res.ok) {
        window.location.href = "/admin/dashboard";
        console.log("Admin account created successfully");
      } else {
        console.error("Erreur lors de la création de votre compte admin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {" "}
      {isPasswordValid ? (
        <div>
          <SignIn createAdmin={createAdmin} />
        </div>
      ) : (
        <div>
          <h2>Enter Admin Password</h2>
          <input
            type="text"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter Admin Password"
          />
          <Button onClick={handlePasswordSubmit}>Valider</Button>
        </div>
      )}
    </div>
  );
}
