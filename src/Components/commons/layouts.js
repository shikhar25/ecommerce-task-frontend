import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { _TOKEN_141414_FSLKDFJ } from "./__utils";
import { toast } from "react-toastify";
import "./sidebar.css";

export const PublicLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export const DashboardLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const _token = localStorage.getItem(_TOKEN_141414_FSLKDFJ);
    if (!_token) {
      toast.error("User not authenticated");
      return navigate("/");
    }
  }, []);
  const logoutHndl = () => {
    localStorage.removeItem(_TOKEN_141414_FSLKDFJ);
    navigate("/login");
  };
  return (
    <div>
      <div class="sidebar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/Products">Product</Link>
        <Link to="/dashboard/Wallet">Wallet</Link>
        <Link to="/dashboard/alltransaction">Transaction</Link>
        <Link to="/dashboard/cart">Cart</Link>
        <a onClick={logoutHndl} href="#">
          Logout
        </a>
      </div>
      <Outlet />
    </div>
  );
};
