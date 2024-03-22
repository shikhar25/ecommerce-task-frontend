import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Forgot from "./Components/Forgotpassword";
import Products from "./Components/Product";
import AllTransactions from "./Components/allTransactions";
import Wallet from "./Components/wallet";
import Dashboard from "./Components/dashobard";
import Cart from "./Components/carts";
import { PublicLayout, DashboardLayout } from "./Components/commons/layouts";
import { ToastContainer, toast } from "react-toastify";
import { _TOKEN_141414_FSLKDFJ } from "./Components/commons/__utils";
import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [userState, setUserState] = useState(null);
  const [socket, setSocket] = useState(null);
  const [lastNotification, setLastNotification] = useState(null);
  const [notify, setNotify] = useState(null);
  const getCurrentUser = async (_token) => {
    try {
      const { data } = await axios.get(`http://localhost:8001/user/get-user`);
      if (data?.success) {
        setUserState(data?.data);
      } else {
        setUserState(null);
      }
    } catch (error) {
      setUserState(null);
    }
  };

  useEffect(() => {
    const _token = localStorage.getItem(_TOKEN_141414_FSLKDFJ);
    if (_token) {
      getCurrentUser(_token);
    }
  }, []);

  useEffect(() => {
    if (userState) {
      try {
        const newSocket = io(`ws://localhost:8001/notification`, {
          transports: ["websocket"],
        });
        if (newSocket) {
          setSocket(newSocket);
          newSocket.connect();
          newSocket.on("notification", (args) => {
            if (userState?._id != args?.userId) {
              setNotify(args);
              setTimeout(() => {
                setNotify(null);
              }, 1000);
            }
          });
          newSocket.on("connect", () => {
            console.log("Connected to channel");
          });
        }
      } catch (error) {
        console.log("error -> ", error);
      }
    }
  }, [userState]);
  return (
    <div className="App">
      <ToastContainer />
      {notify && (
        <div
          style={{
            position: "fixed",
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            backgroundColor: "red",
            padding: 20,
          }}
        >
          <p style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
            Notification : {notify?.type}
          </p>
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotpassword" element={<Forgot />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* <Route index element={<Sidebar />} /> */}
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="alltransaction" element={<AllTransactions />} />
            <Route path="Cart" element={<Cart />} />
            <Route
              key={userState}
              path="Products"
              element={<Products userState={userState} />}
            />
            <Route path="Wallet" element={<Wallet />} />
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
