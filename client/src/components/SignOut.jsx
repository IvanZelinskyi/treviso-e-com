import React from "react";

const SignOut = ({ setLogoutWindow }) => {
  return (
    <div className="profile-logout">
      <button
        className="singleProd-addtocart"
        onClick={() => setLogoutWindow(true)}
      >
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SignOut;
