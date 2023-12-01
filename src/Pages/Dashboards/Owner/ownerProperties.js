import { useState, useEffect } from "react";
import {
  refreshAccessToken,
  fetchUserData,
  handleLogOut,
} from "../../../Services/authFunctions";
import "../../../Css/Dashboard.css";
import "../../../Css/CustomModal.css";
import { Modal } from "react-bootstrap";
import UserSideBarOwner from "../../../Components/UserSideBarOwner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Logout } from "@mui/icons-material";

const OwnerRequest = () => {
  const handleMarkAsDone = async (propertyId, score) => {
    console.log(propertyId);
    try {
      const markResponse = await axios.put(
        `http://localhost:8081/api/owner/properties/${propertyId}/done?score=${score}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
      console.log("Assignment Response:", markResponse);
    } catch (error) {
      console.error("does not work getting error: ", error);
    }
  };
  //  importing refreshToken and accessToken auth START  //
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        accessToken = await refreshAccessToken();
      }
      await fetchUserData(accessToken, setUserData);
    };

    fetchData();
  }, []);
  //  importing refreshToken and accessToken auth END  //

  // Showing Modals From Server START
  const [showModal, setShowModal] = useState([]);
  const toggleModal = (index) => {
    const newShowModal = [...showModal];
    newShowModal[index] = !newShowModal[index];
    setShowModal(newShowModal);
  };
  // Showing Modals From Server END
  // Showing Modals  Add Request on Page START
  const [addRequest, setAddRequest] = useState(false);
  const handleClose = () => setAddRequest(false);
  const handleShow = () => setAddRequest(true);
  // Showing Modals  Add Request on Page END

  // Adding Request START

  const [formData, setFormData] = useState({
    price: "",
    area: "",
    hasPet: false,
    city: "",
    district: "",
    rooms: "",
    beds: "",
    info: "",
    propertyType: "",
    transactionType: "",
  });
  const handleSubmit = async (event) => {
    let accessToken = localStorage.getItem("accessToken");
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/owner/properties/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("successfully added: ", response.data);
      window.location.reload();
    } catch (error) {
      console.log(`some error: ${error}`);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio" && name === "hasPet") {
      setFormData({ ...formData, hasPet: value === "true" });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  // Adding Request END

  // Requests Images START
  const propertyTypeImages = {
    HOUSING:
      "https://res.cloudinary.com/brickandbatten/images/f_auto,q_auto/v1675439478/wordpress_assets/SmallHouseExteriors-Twitter-card-B-LOGO/SmallHouseExteriors-Twitter-card-B-LOGO.jpg?_i=AA",
    COMMERCIAL:
      "https://www.worthpropertymgt.com/wp-content/uploads/2019/12/Propane-Homepage-Other-Uses-Commercial-Buildings-Marquee-1800x1200-Modern-Commercial-Building.jpg",
    HOTEL:
      "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
    LAND: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHxlbnwwfHwwfHx8MA%3D%3D",
    APARTMENT:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/267262611.jpg?k=c5202738fb9f021dcd0d0daa060d88d39eb60e27afd35f20b5d6b117d2849d88&o=&hp=1",
  };
  // Requests Images END
  let accessToken = localStorage.getItem("accessToken");
  const [agentData, setAgentData] = useState([]);
  const [showAgent, setShowAgent] = useState(false);

  const fetchAgentData = async () => {
    try {
      const agentResponse = await axios.get(
        "http://localhost:8081/api/owner/properties/agents",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAgentData(agentResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (showAgent) {
      fetchAgentData();
    }
  }, []);

  const goToAgents = (propertyId) => {
    let request = localStorage.setItem("propertyId", propertyId);
    window.location.href = "http://localhost:3000/owner/properties/agents";
    console.log(request);
  };
  // Delete Button START
  const handleDelete = async (propertyId) => {
    console.log(propertyId);
    try {
      const deleteResponse = await axios.post(
        `http://localhost:8081/api/owner/properties/${propertyId}/delete`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(deleteResponse); WORKS
      window.location.reload();
    } catch (error) {
      console.error("delete not Works: ", error);
    }
  };
  // Delete Button END
  return (
    <div className="dashboard">
      <div className="app-container">
        <UserSideBarOwner></UserSideBarOwner>
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Properties</h1>
          </div>
          <div className="app-content-actions">
            <input className="search-bar" placeholder="Search..." type="text" />

            <button className="button-64" onClick={handleShow}>
              <span className="text">Add Property</span>
            </button>

            <Modal show={addRequest} onHide={handleClose} size="xl">
              <Modal.Header className="center back-color">
                <Modal.Title>
                  <span className="modal-title">Adding Properties</span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="back-color">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Row>
                      <Col>
                        <div className="center">
                          <Form.Control
                            className="placeholder-color back-color input-modal"
                            type="text"
                            name="city"
                            id="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="center">
                          <Form.Control
                            className="placeholder-color input-modal"
                            type="text"
                            name="district"
                            id="district"
                            placeholder="District"
                            value={formData.district}
                            onChange={handleChange}
                          />{" "}
                        </div>
                      </Col>
                      <Col>
                        <div className="center">
                          <Form.Control
                            className="placeholder-color input-modal"
                            type="number"
                            name="rooms"
                            id="rooms"
                            placeholder="Number Of Rooms"
                            value={formData.rooms}
                            onChange={handleChange}
                          />{" "}
                        </div>
                        <div className="center">
                          <Form.Control
                            className="placeholder-color input-modal"
                            type="number"
                            name="beds"
                            id="beds"
                            placeholder="Number Of Beds"
                            value={formData.beds}
                            onChange={handleChange}
                          />{" "}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="select-div center">
                          <label className="select-label">
                            Choose Property Type:
                          </label>
                          <Form.Select
                            className="back-color select-type"
                            onChange={handleChange}
                            name="propertyType"
                            value={formData.propertyType}
                          >
                            <option>Choose one</option>
                            <option value="HOTEL">Hotel</option>
                            <option value="APARTMENT">Apartment</option>
                            <option value="HOUSING">House</option>
                            <option value="COMMERCIAL">Commercial</option>
                            <option value="LAND">Land</option>
                          </Form.Select>
                        </div>
                      </Col>

                      <Col>
                        <div className="hasPet-group center">
                          <label className="question">Do You Have Pets:</label>
                          <label className="hasPet-label">
                            <input
                              type="radio"
                              name="hasPet"
                              id="noPet"
                              onChange={handleChange}
                              value="false"
                              defaultChecked
                            />
                            <span>No Pet</span>
                          </label>
                          <label className="hasPet-label">
                            <input
                              type="radio"
                              name="hasPet"
                              id="yesPet"
                              value="true"
                              onChange={handleChange}
                            />
                            <span>Has Pet</span>
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="center">
                          <Form.Control
                            className="placeholder-color input-modal"
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                          />{" "}
                        </div>
                      </Col>
                      <Col>
                        <div className="center">
                          <Form.Control
                            className="placeholder-color input-modal"
                            type="Number"
                            name="area"
                            id="area"
                            placeholder="Area"
                            value={formData.area}
                            onChange={handleChange}
                          />{" "}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="hasPet-group center">
                          <label className="question">Transaction Type:</label>
                          <label className="hasPet-label">
                            <input
                              type="radio"
                              name="transactionType"
                              id="rent"
                              onChange={handleChange}
                              value="RENT"
                            />
                            <span>Rent</span>
                          </label>
                          <label className="hasPet-label">
                            <input
                              type="radio"
                              name="transactionType"
                              id="buy"
                              value="BUY"
                              onChange={handleChange}
                            />
                            <span>Buy</span>
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Form.Label>
                      Info <sup className="optional">Optional*</sup>
                    </Form.Label>
                    <Form.Control
                      className="back-color"
                      as="textarea"
                      name="info"
                      onChange={handleChange}
                      value={formData.info}
                      rows={3}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="back-color">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="app-content-actions-wrapper">
              <div className="filter-button-wrapper">
                <button className="action-button filter jsFilter">
                  <span>Filter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-filter"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </button>
                <div className="filter-menu">
                  <label>Category</label>
                  <select>
                    <option>All Categories</option>
                  </select>
                  <label>Status</label>
                  <select>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
              <button className="action-button list active" title="List View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-list"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
              <button className="action-button grid" title="Grid View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-grid"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="products-area-wrapper tableView">
            <div className="products-header">
              <div className="product-cell image">
                City
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="product-cell category">
                District
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="product-cell status-cell">
                Status
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="product-cell image">
                Transaction
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="product-cell image">
                Property
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="product-cell sales">
                Avg. Budget
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>

              <div className="product-cell price">
                Agent ID
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {userData.length > 0 ? (
              userData[0].map((property, index) => (
                <div key={property.propertyId}>
                  <div className="products-row">
                    <div className="product-cell image">
                      <img
                        src={
                          property.propertyType &&
                          propertyTypeImages[property.propertyType]
                            ? propertyTypeImages[property.propertyType]
                            : "default_image_url_if_propertyType_not_found_or_invalid"
                        }
                        alt="product"
                      />
                      <span onClick={() => toggleModal(index)}>
                        {property.city}
                      </span>
                    </div>
                    <div className="product-cell category ">
                      <span onClick={() => toggleModal(index)}>
                        {property.district}
                      </span>
                    </div>
                    <div className="product-cell status-cell">
                      {property.isActive ? (
                        <span onClick={() => toggleModal(index)}>
                          <div className="status active">Active</div>
                        </span>
                      ) : (
                        <span onClick={() => toggleModal(index)}>
                          <div className="status disabled">Inactive</div>
                        </span>
                      )}
                    </div>
                    <div className="product-cell category">
                      <span onClick={() => toggleModal(index)}>
                        {property.transactionType}
                      </span>
                    </div>

                    <div className="product-cell category">
                      <span onClick={() => toggleModal(index)}>
                        {property.propertyType}
                      </span>
                    </div>
                    <div className="product-cell category">
                      <span onClick={() => toggleModal(index)}>
                        {property.price}$
                      </span>
                    </div>
                    <div className="product-cell category">
                      {property.agentId > 0 ? (
                        <span>{property.agentId}</span>
                      ) : (
                        <button
                          className="button-33"
                          onClick={() => goToAgents(property.propertyId)}
                        >
                          Assign Agent
                        </button>
                      )}
                    </div>
                  </div>
                  <Modal
                    size="xl"
                    show={showModal[index]}
                    onHide={() => toggleModal(index)}
                  >
                    <Modal.Header className="no-white">
                      <img
                        width={"100%"}
                        src={
                          property.propertyType &&
                          propertyTypeImages[property.propertyType]
                            ? propertyTypeImages[property.propertyType]
                            : "default_image_url_if_propertyType_not_found_or_invalid"
                        }
                        alt="product"
                      />
                    </Modal.Header>
                    <Modal.Body className="back-color">
                      <Container>
                        <Row>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Property ID: </span>
                              {property.propertyId}
                            </div>
                            <div className="center">
                              <span className="bold-info">Owner ID: </span>
                              {property.ownerId}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">City: </span>
                              {property.city}
                            </div>
                            <div className="center">
                              <span className="bold-info">District: </span>
                              {property.district}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Rooms: </span>
                              {property.rooms}
                            </div>
                            <div className="center">
                              <span className="bold-info">Beds: </span>
                              {property.beds}
                            </div>
                          </Col>
                        </Row>
                        <Row className="farther">
                          <Col>
                            <div className="center">
                              <span className="bold-info">Average Price: </span>
                              {property.price}$
                            </div>
                            <div className="center">
                              <span className="bold-info">Pets:</span>
                              {property.hasPet ? "Yes" : "No"}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Property Type: </span>
                              {property.propertyType}
                            </div>
                            <div className="center">
                              <span className="bold-info">
                                Transaction Type:{" "}
                              </span>
                              {property.transactionType}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Start Date: </span>
                              {property.startDate}
                            </div>
                            <div className="center">
                              <span className="bold-info">End Date: </span>
                              {property.endDate}
                            </div>
                          </Col>
                        </Row>
                        <Row className="farther"></Row>
                      </Container>

                      <div className="info">
                        <span className="bold-info">Info: </span>
                        <span className="additional-info">{property.info}</span>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="back-color">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(property.propertyId)}
                      >
                        Delete
                      </Button>
                      {property.isActive ? <Button
                        variant="success"
                        onClick={() => handleMarkAsDone(property.propertyId, 5)}
                      >
                        Mark As Done
                      </Button> : 
                      <Button
                      disabled
                      variant="success"
                      onClick={() => handleMarkAsDone(property.propertyId, 5)}
                    >
                      Mark As Done
                    </Button>}
                    </Modal.Footer>
                  </Modal>
                </div>
              ))
            ) : (
              <div>
                <div className="products-row">
                  <div className="product-cell image">
                    <img src="" alt="product" />
                    <span>No Data</span>
                  </div>
                  <div className="product-cell category "> No Data</div>
                  <div className="product-cell status-cell">No Data</div>
                  <div className="product-cell category">No Data</div>

                  <div className="product-cell category">No Data</div>
                  <div className="product-cell category">No Data</div>
                  <div className="product-cell category">No Data</div>
                </div>
              </div>
            )}
          </div>

          <div className="footer">
            <button onClick={handleLogOut} className="btn btn-color ">
              <Logout /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerRequest;
