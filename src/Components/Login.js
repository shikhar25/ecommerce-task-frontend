import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Assuming you have a Login.css file for styling
import { _TOKEN_141414_FSLKDFJ } from "./commons/__utils";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loginClicked = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await axios.post("http://localhost:8001/user/signIn", {
        userEmail: email,
        userPassword: password,
      });
      const { token } = response.data.data;
      localStorage.setItem(_TOKEN_141414_FSLKDFJ, token);
      navigate("/dashboard");
      toast.success("Welcome to dashboard");
    } catch (error) {
      setLoading(false);
      setError("Invalid email or password. Please try again.");
      console.error(error);
    }
  };
  return (
    <div className="login-container">
      <div className="loginBox">
        <h1 className="login-heading">Login</h1>
        <div className="form-control">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-control">
          <button onClick={loginClicked} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
        <br />
        <p>OR</p>
        <br />
        <span>
          <Link to="/signup">SignUp Page</Link>
        </span>
        &nbsp;&nbsp;
        <span>
          <Link to="/forgotpassword">Forgot Password</Link>
        </span>
      </div>
    </div>
  );
}
export default Login;
