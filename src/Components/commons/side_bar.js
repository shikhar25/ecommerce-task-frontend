import React from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { _TOKEN_141414_FSLKDFJ } from "./__utils";
function SidebarLayout() {
  const navigate = useNavigate();
  const logoutHndl = () => {
    console.log("logout");
    // localStorage.removeItem(_TOKEN_141414_FSLKDFJ);
    // navigate("/login");
  };
  return (
    <>
      <div class="sidebar">
        <a class="active" href="#Dashbord">
          Dashbord
        </a>
        <a href="#Product">Product</a>
        <a href="#Wallet">Wallet</a>
        <a href="#Transaction">Transaction</a>
        <a href="#Cart">Cart</a>
        <p onClick={logoutHndl}>Logout</p>
      </div>
    </>
  );
}

export default SidebarLayout;
