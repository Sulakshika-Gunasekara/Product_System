import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Table, Button, Modal, Form } from "react-bootstrap"; // Import necessary components

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null); // Track product for update
  const [newproduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();

  // Function to get token from localStorage before each API call
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login"); // Redirect to login page if no token is found
      return; // Stop execution if no token
    }

    // If token exists, fetch products
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [navigate]);

  // Handle modal close
  const handleClose = () => {
    setShowModal(false);
    setProductToUpdate(null); // Reset update product state
    setNewProduct({ title: "", description: "", price: "" }); // Reset form data
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (productToUpdate) {
      // If updating a product, update productToUpdate state
      setProductToUpdate({ ...productToUpdate, [name]: value });
    } else {
      // Otherwise update newproduct state for creating new product
      setNewProduct({ ...newproduct, [name]: value });
    }
  };

  // Handle Update button click
  const handleUpdateClick = (product) => {
    setProductToUpdate(product); // Set the product to be updated
    setNewProduct({
      title: product.title,
      description: product.description,
      price: product.price,
    });
    setShowModal(true); // Show the modal for update
  };

  // Handle Delete button click
  const handleDelete = async (id) => {
    const token = getAuthToken();

    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login"); // Redirect to login if no token
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await axios.get("http://localhost:5000/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data); // Fetch updated products after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Handle form submission for Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();

    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/"); // Redirect to login if no token
      return;
    }

    try {
      if (productToUpdate) {
        // Update product
        await axios.put(
          `http://localhost:5000/api/products/${productToUpdate._id}`,
          productToUpdate,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Create new product
        await axios.post("http://localhost:5000/api/products/", newproduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      handleClose(); // Close the modal after submission

      // Refresh the product list
      const res = await axios.get("http://localhost:5000/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error submitting product:", err);
      setError("Failed to submit product");
    }
  };

  return (
    <>
      <Container
        className=" d-flex justify-content-center"
        style={{ minHeight: "100vh", padding: "0px", width: "100vw" }}>
        <Card
          className="shadow-lg p-4 w-100 justify-content-center "
          style={{ maxWidth: "1000px" }}>
          <Card.Body>
            <h2 className="text-center text-primary mb-2">Products List</h2>
            <div className="mt-3 d-flex justify-content">
              <Button variant="secondary my-4 " onClick={() => navigate("/")}>
                Go to Login
              </Button>
            </div>
            <Table
              bordered
              hover
              responsive
              className="mt-3 shadow table table-striped">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-muted text-center">
                      No products available
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          data-id={product._id}
                          onClick={() => handleUpdateClick(product)}>
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          data-id={product._id}
                          onClick={() => handleDelete(product._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New Product
          </Button>
        </Card>
      </Container>

      {/* Modal for Create or Update Product */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {productToUpdate ? "Update Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={
                  productToUpdate ? productToUpdate.title : newproduct.title
                }
                onChange={handleInputChange}
                required
                placeholder="Enter product title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={
                  productToUpdate
                    ? productToUpdate.description
                    : newproduct.description
                }
                onChange={handleInputChange}
                required
                placeholder="Enter product description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={
                  productToUpdate ? productToUpdate.price : newproduct.price
                }
                onChange={handleInputChange}
                required
                placeholder="Enter product price"
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {productToUpdate ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashboard;
