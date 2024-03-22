// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import './Home.css';
// import { _TOKEN_141414_FSLKDFJ } from "./commons/__utils";

// function Login() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const loginClicked = async () => {
//         debugger
//         try {
//             const response = await axios.post('http://localhost:8001/user/signIn', { userEmail: email, userPassword: password });
//             const { token } = response.data;
//             localStorage.setItem(_TOKEN_141414_FSLKDFJ, token);
//             navigate('/dashboard');
//         } catch (error) {
//             console.error(error);
//             // Handle login error, e.g., show error message
//         }
//     };

//     return (
//         <div className="login">
//             <h1 className="login_div">Login</h1>
//             <div className="form-control">
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//             </div>
//             <div className="form-control">
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//             </div>
//             <div className="form-control">
//                 <button onClick={loginClicked}>Submit</button>
//             </div>
//             <br />
//             <p>OR</p>
//             <br />
//             <span>
//                 <Link to="/signup">Signup Page</Link>
//             </span>&nbsp;&nbsp;
//             <span>
//                 <Link to="/forgotpassword">Forgot Password</Link>
//             </span>
//         </div>
//     );
// }

// export default Login;
