import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";
import InputMUI from "./commons/input-field";
import { toast } from "react-toastify";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); 
  let user = localStorage.getItem('user');
  user = JSON.parse(user)


  useEffect(() => {
    fetchCart();
  }, []);
  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/cart/getUserCart/${user._id}`,
        {}
      );
      if (response.data.message === "Success") {
        setCart(response.data.data.cart);
        calculateTotalAmount(response.data.data.cart);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error.message);
    }
  };
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/cart/removeFromCart/${productId}`,
        {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN_HERE",
          },
        }
      );
      console.log(response.data);
      fetchCart();
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
    }
  };
  const handleCheckout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/cart/checkout",
        {}
      );
      toast.success("Cart checkout successfully");
      console.log(response.data);
      fetchCart();
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };
  const calculateTotalAmount = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.totalAmount;
    });
    setTotalAmount(total);
  };
  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        Cart
      </Typography>
      <Typography
        variant="h6"
        style={{ textAlign: "center", margin: "10px 0" }}
      >
        Total Amount: {totalAmount}
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          marginLeft: "20%",
        }}
      >
        {cart.map((item) => (
          <Card key={item._id} style={{ maxWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product ID: {item.productId}
              </Typography>
              <Typography variant="body1">Quantity: {item.quantity}</Typography>
              <Typography variant="body1">
                Total Amount: {item.totalAmount}
              </Typography>
            </CardContent>
            <Button
              color="error"
              onClick={() => handleRemoveFromCart(item.productId)}
            >
              Remove from Cart
            </Button>
          </Card>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </>
  );
};
export default Cart;
