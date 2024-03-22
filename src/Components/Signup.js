import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data: response } = await axios.post(
        "http://localhost:8001/user/signUp",
        {
          userName: userName,
          userEmail: userEmail,
          userPassword: userPassword,
        }
      );
      const { message, data, success } = response;
      if (!success) {
        console.log("message : ", message);
      } else {
        navigate("/login");
        console.log("response : ", data);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };
  return (
    <div className="SignupContainer">
      <div class="SignupBox">
        <h1 className="SignupHeading">SignUp</h1>
        <div className="SignupForm">
          <input
            className="SignupInput"
            type="username"
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="UserName"
          />
          <input
            className="SignupInput"
            type="email"
            value={userEmail}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            className="SignupInput"
            type="password"
            value={userPassword}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button className="SignupButton" onClick={onSubmit}>
            Submit
          </button>
        </div>
        <Link className="SignupLink" to="/">
          Login Page
        </Link>
      </div>
    </div>
  );
}
export default Signup;
