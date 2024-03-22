import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputMUI from "./commons/input-field";
const QuantityPopup = ({ open, handleClose, handleAddToCart }) => {
  const [quantity, setQuantity] = useState("");
  const handleAdd = () => {
    handleAddToCart(quantity);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Quantity</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the quantity for this product:
        </DialogContentText>
        <InputMUI
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd} color="primary" autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default QuantityPopup;
