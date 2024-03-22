import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/wallet/transactions"
        );
        if (!response.data) {
          throw new Error("Failed to fetch transactions");
        }
        setTransactions(response.data.data.transactions);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTransactions();
  }, []);
  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-GB", options);
  };
  return (
    <div
      style={{
        margin: "20px",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Transactions
      </h2>
      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="transaction table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                  Type
                </TableCell>
                <TableCell
                  align="right"
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Amount
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="right"
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow
                  key={transaction._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#d0ffea" : "inherit",
                  }}
                >
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell align="right">${transaction.amount}</TableCell>
                  <TableCell align="right">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.description || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
