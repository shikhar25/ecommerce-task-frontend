import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import InputMUI from "./commons/input-field";
import QuantityPopup from "../Components/qyantityPopUp";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Products({ userState }) {
  const [modalState, setModalState] = useState({ isOpen: false });
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [quantityPopupOpen, setQuantityPopupOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [products, setProducts] = useState([]);

  const addNewitem = async () => {
    try {
      await axios.post("http://localhost:8001/products/addProduct", formState);
      fetchList();
      setModalState({ isOpen: false });
      toast.success("Added successfully!");
    } catch (error) {
      toast.error("Facing issue!");
    }
  };
  const udpateItem = async () => {
    try {
      await axios.put(
        `http://localhost:8001/products/updateProduct/${modalState.data?._id}`,
        formState
      );
      fetchList();
      setModalState({ isOpen: false });
      toast.success("Updated successfully!");
    } catch (error) {
      toast.error("Facing issue!");
    }
  };
  const fetchList = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8001/products/getAllProducts",
        formState
      );
      setProducts(data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const deleteItem = async (product) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8001/products/deleteProduct/${product._id}`
      );
      fetchList();
      toast.success(data?.message);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const handleAddToCart = (productId) => {
    setSelectedProductId(productId);
    setQuantityPopupOpen(true);
  };
  useEffect(() => {
    fetchList();
  }, []);


  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        Products
      </Typography>
      <div style={{ marginLeft: "200px" }}>
        <Button
          class="button button-grad"
          style={{ marginLeft: "900px" }}
          onClick={() => {
            setModalState({ isOpen: true, type: "create" });
            setFormState({
              name: "",
              description: "",
              price: "",
              quantity: "",
            });
          }}
        >
          Add Products
        </Button>
        <Modal
          open={modalState.isOpen}
          onClose={() => {
            setModalState({ isOpen: false });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {modalState?.type == "create" ? (
              <h4>Add New Product</h4>
            ) : modalState?.type == "view" ? (
              <h4>View Product</h4>
            ) : (
              <h4>Edit Product</h4>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <InputMUI
                placeholder="Name"
                disabled={modalState?.type == "view"}
                value={formState.name}
                onChange={(e) => {
                  setFormState((_) => ({ ..._, name: e.target.value }));
                }}
              />
              <InputMUI
                type="number"
                disabled={modalState?.type == "view"}
                placeholder="Price"
                value={formState.price}
                onChange={(e) => {
                  setFormState((_) => ({ ..._, price: e.target.value }));
                }}
              />
              <InputMUI
                placeholder="Description"
                disabled={modalState?.type == "view"}
                value={formState.description}
                onChange={(e) => {
                  setFormState((_) => ({ ..._, description: e.target.value }));
                }}
              />
              <InputMUI
                type="number"
                placeholder="Quantity"
                disabled={modalState?.type == "view"}
                value={formState.quantity}
                onChange={(e) => {
                  setFormState((_) => ({ ..._, quantity: e.target.value }));
                }}
              />
            </div>
            <br />
            {!(modalState?.type == "view") && (
              <>
                <Button
                  color="success"
                  onClick={
                    modalState?.type == "create" ? addNewitem : udpateItem
                  }
                >
                  {modalState?.type == "create" ? "Add New" : "Update"}
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    setModalState({ isOpen: false });
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </div>
      <Table
        className="table table-sm"
        style={{ marginLeft: "200px", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.length === 0 ? (
            <tr>
              <td colSpan="6">No Products</td>
            </tr>
          ) : (
            products.map((_item, idx) => {
              return (
                <tr key={_item._id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{_item.name}</td>
                  <td>{_item.description}</td>
                  <td>${_item.price}</td>
                  <td>{_item.quantity}</td>
                  <td>
                    <span>
                      <Button
                        onClick={() => {
                          setFormState(_item);
                          setModalState((prevState) => ({
                            ...prevState,
                            isOpen: true,
                            type: "view",
                          }));
                        }}
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => {
                          setFormState(_item);
                          setModalState((prevState) => ({
                            ...prevState,
                            isOpen: true,
                            type: "edit",
                            data: _item,
                          }));
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          deleteItem(_item);
                        }}
                      >
                        Delete
                      </Button>
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      {/* Quantity Popup */}
      <QuantityPopup
        open={quantityPopupOpen}
        handleClose={() => setQuantityPopupOpen(false)}
        // handleAddToCart={(quantity) => {
        // // Call addToCart function here with selectedProductId and quantity
        // console.log("Adding to cart:", selectedProductId, quantity);
        // }}
      />
    </>
  );
}
export default Products;
