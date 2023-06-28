import React from "react";
import { TbLogout } from "react-icons/tb";
const SignOut = ({ auth }) => {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        <TbLogout />
        &nbsp;<span>Logout</span>
      </button>
    )
  );
};
export default SignOut;
