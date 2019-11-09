import React from "react";

import "./navigation.styles.scss";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="navigation">
        <p onClick={() => onRouteChange("signin")}>Logout</p>
      </nav>
    );
  } else {
    return (
      <nav className="navigation">
        <p onClick={() => onRouteChange("signin")}>Sign in</p>
        <p onClick={() => onRouteChange("register")}>Register</p>
      </nav>
    );
  }
};

export default Navigation;
