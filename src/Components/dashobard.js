import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";



export default function DashboardLayout() {
    
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/products/getAllProducts",
        {}
      );
      if (response.data.message === "Success") {
        setProducts(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const addToCart = (productId) => {
    setSelectedProduct(productId);
    setShowPopup(true);
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleSubmit = async () => {
    console.log(
      "Adding product with ID:",
      selectedProduct,
      "to cart with quantity:",
      quantity
    );
    try {
      const response = await axios.post(
        "http://localhost:8001/cart/addToCart",
        {
          productId: selectedProduct,
          quantity: quantity,
        }
      );
      setQuantity(1);
      setShowPopup(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        Dashboard
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginLeft: "20%",
        }}
      >
        {error ? (
          <Typography
            variant="body1"
            color="error"
            style={{ gridColumn: "1 / -1", textAlign: "center" }}
          >
            {error}
          </Typography>
        ) : (
          products.map((product) => (
            <Card key={product._id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image="/cloth.jpg"
                  alt="Product Image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {product.quantity}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="error"
                  onClick={() => addToCart(product._id)}
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          ))
        )}
        <Modal open={showPopup} onClose={() => setShowPopup(false)}>
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
              Add to Cart
            </Typography>
            <div>
              <Button onClick={handleDecrement}>-</Button>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: "60px", margin: "0 10px" }}
              />
              <Button onClick={handleIncrement}>+</Button>
            </div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
}
