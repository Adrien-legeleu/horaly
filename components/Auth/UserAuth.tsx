import React from "react";
import SignIn from "./sign-in";

export default function UserAuth() {
  return (
    <div>
      <h2>User login</h2>
      <SignIn createAdmin={() => {}} />
    </div>
  );
}
