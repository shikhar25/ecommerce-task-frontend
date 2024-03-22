import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast } from "react-toastify";

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [error, setError] = useState(null);
  const [addOpenModal, setAddOpenModal] = useState(false);
  const [deductOpenModal, setDeductOpenModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/wallet/balance/65fc5147960eec2bf3ca3d1f"
        );
        if (!response.data) {
          throw new Error("Failed to fetch wallet balance");
        }
        setWalletBalance(response.data.data.wallet.amount);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchWalletBalance();
  }, []);
  const handleAddMoney = () => {
    setAddOpenModal(true);
  };
  const handleWithdrawal = () => {
    setDeductOpenModal(true);
  };
  const handleCloseAddModal = () => {
    setAddOpenModal(false);
  };
  const handleCloseDeductModal = () => {
    setDeductOpenModal(false);
  };
  const handleConfirmAdd = async () => {
    try {
      if (amount && description) {
        const response = await axios.post(
          "http://localhost:8001/wallet/topUp",
          {
            description: description,
            amount: parseFloat(amount),
          }
        );
        toast.success("Money added successfully!");
        setWalletBalance(response.data.data.newBalance);
        setAddOpenModal(false);
      } else {
        throw new Error("Please fill in all the fields");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleConfirmDeduct = async () => {
    try {
      if (amount && description) {
        const response = await axios.post(
          "http://localhost:8001/wallet/withdraw",
          {
            userId: "65fc5147960eec2bf3ca3d1f",
            amount: parseFloat(amount),
          }
        );
        toast.success("Withdrawal successful!");
        setWalletBalance(response.data.data.newBalance);
        setDeductOpenModal(false);
      } else {
        throw new Error("Please fill in all the fields");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        Wallet
      </Typography>
      <Card sx={{ minWidth: 0 }} style={{ marginLeft: "250px" }}>
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Wallet Amount
          </Typography>
          {error ? (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          ) : (
            <Typography variant="h5" component="div">
              ${walletBalance}
            </Typography>
          )}
          <Typography variant="body2">
            {/* If you want to add amount in wallet please click on add button or deduc */}
            <br />
          </Typography>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMoney}
              style={{ marginRight: "10px" }}
            >
              Add Money
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleWithdrawal}
            >
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>
      <Modal
        open={addOpenModal}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add Money
          </Typography>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmAdd}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal
        open={deductOpenModal}
        onClose={handleCloseDeductModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Withdraw
          </Typography>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmDeduct}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Wallet;
