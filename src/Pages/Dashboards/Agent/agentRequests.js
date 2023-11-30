import { useState, useEffect } from "react";
import {
  refreshAccessToken,
  fetchUserData,
  handleLogOut,
} from "../../../Services/authFunctions";
import "../../../Css/Dashboard.css";
import "../../../Css/CustomModal.css";
import { Modal } from "react-bootstrap";
import UserSideBarAgent from "../../../Components/UserSideBarAgent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

import { Button } from "react-bootstrap";
import { Logout } from "@mui/icons-material";

const AgentRequests = () => {
  let accessToken = localStorage.getItem("accessToken");

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

  // Match START
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [match, setMatch] = useState({});
  const fetchData = async (requestId) => {
    try {
      const matchResponse = await axios.get(
        `http://localhost:8081/api/agent/requests/${requestId}/match`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      handleShow();
      setMatch(matchResponse.data);
      console.log(matchResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Match END

  return (
    <div className="dashboard">
      <div className="app-container">
        <UserSideBarAgent></UserSideBarAgent>
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Available Requests</h1>
          </div>
          <div className="app-content-actions">
            <input className="search-bar" placeholder="Search..." type="text" />

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
              userData[0].map((request, index) => (
                <div key={request.requestId}>
                  <div className="products-row">
                    <div className="product-cell image">
                      <img
                        src={
                          request.propertyType &&
                          propertyTypeImages[request.propertyType]
                            ? propertyTypeImages[request.propertyType]
                            : "default_image_url_if_propertyType_not_found_or_invalid"
                        }
                        alt="product"
                      />{" "}
                      <span onClick={() => toggleModal(index)}>
                        {request.city}
                      </span>
                    </div>
                    <div className="product-cell category ">
                      <span onClick={() => toggleModal(index)}>
                        {request.district}
                      </span>
                    </div>
                    <div className="product-cell status-cell">
                      {request.isActive ? (
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
                        {request.transactionType}
                      </span>
                    </div>

                    <div className="product-cell category">
                      <span onClick={() => toggleModal(index)}>
                        {request.propertyType}
                      </span>
                    </div>
                    <div className="product-cell category">
                      <span onClick={() => toggleModal(index)}>
                        {Math.round((request.minPrice + request.maxPrice) / 2)}${" "}
                      </span>
                    </div>
                    <div className="product-cell category">
                      {request.agentId > 0 ? (
                        <button
                          className="button-33"
                          onClick={() => fetchData(request.requestId)}
                        >
                          Request {request.requestId} Match
                        </button>
                      ) : (
                        <span>{request.agentId}</span>
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
                          request.propertyType &&
                          propertyTypeImages[request.propertyType]
                            ? propertyTypeImages[request.propertyType]
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
                              <span className="bold-info">Request ID: </span>
                              {request.requestId}
                            </div>
                            <div className="center">
                              <span className="bold-info">Client ID: </span>
                              {request.clientId}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">City: </span>
                              {request.city}
                            </div>
                            <div className="center">
                              <span className="bold-info">District: </span>
                              {request.district}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Rooms: </span>
                              {request.rooms}
                            </div>
                            <div className="center">
                              <span className="bold-info">Beds: </span>
                              {request.beds}
                            </div>
                          </Col>
                        </Row>
                        <Row className="farther">
                          <Col>
                            <div className="center ">
                              <span className="bold-info">Average Price: </span>
                              {Math.round(
                                (request.minPrice + request.maxPrice) / 2
                              )}
                              $
                            </div>
                            <div className="center">
                              <span className="bold-info">Pets:</span>
                              {request.hasPet ? "Yes" : "No"}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Property Type: </span>
                              {request.propertyType}
                            </div>
                            <div className="center">
                              <span className="bold-info">
                                Transaction Type:{" "}
                              </span>
                              {request.transactionType}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Start Date: </span>
                              {request.startDate}
                            </div>
                            <div className="center">
                              <span className="bold-info">End Date: </span>
                              {request.endDate}
                            </div>
                          </Col>
                        </Row>
                        <Row className="farther"></Row>
                      </Container>

                      <div className="info">
                        <span className="bold-info">Info: </span>
                        <span className="additional-info">{request.info}</span>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="back-color">
                      <Button variant="danger">Delete</Button>
                      <Button variant="success">Mark As Done</Button>
                    </Modal.Footer>
                  </Modal>
                  {/* MATCH */}
                  <Modal size="xl" show={show} onHide={handleClose}>
                    <Modal.Header className="back-color">
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="back-color">
                      {show && (
                        <div>
                          <h2>Match Details:</h2>
                          <ul>
                            {Object.keys(match).map((key) => (
                              <div key={key} className="inline-object">
                                <strong>{key}:</strong>
                              </div>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Modal.Body>
                    <Modal.Footer className="back-color">
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
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

export default AgentRequests;
