import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Forgot.css";
import Button from "react-bootstrap/Button";
function Forgot() {
    
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");

  return (
    <div className="ForgotPassword">
      <h1>ForgotPassword</h1>
      <br />
      <form action="Fogotpassword">
        <input
          type="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="UserName"
        />
        <br />
        <br />
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <br /> <br />
        <input
          type="password"
          onChange={(e) => {
            setNewpass(e.target.value);
          }}
          placeholder="New Password"
        />
        <br /> <br />
        <input
          type="password"
          onChange={(e) => {
            setConfirmpass(e.target.value);
          }}
          placeholder="Confirm Password"
        />
        <br />
        <br />
        <Button variant="success">Success</Button>
      </form>

      <br />
      <br />

      <Link to="/">Login Page</Link>
    </div>
  );
}

export default Forgot;
