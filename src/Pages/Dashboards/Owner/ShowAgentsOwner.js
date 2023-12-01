import { useState, useEffect, useCallback } from "react";
import {
  refreshAccessToken,
  fetchUserData,
  handleLogOut,
} from "../../../Services/authFunctions";

import UserSideBarOwner from "../../../Components/UserSideBarOwner";

import axios from "axios";
import { Logout } from "@mui/icons-material";

import "../../../Css/Dashboard.css";
import "../../../Css/CustomModal.css";
import { Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

const ShowAgents = () => {
  //  importing refreshToken and accessToken auth START  //
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      var accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        accessToken = await refreshAccessToken();
      }
      await fetchUserData(accessToken, setUserData);
    };

    fetchData();
  }, []);
  //  importing refreshToken and accessToken auth END
  // To Display Agents From Server START
  const [agentData, setAgentData] = useState([]);
  let accessToken = localStorage.getItem("accessToken");
  const fetchAgentData = useCallback(async () => {
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
  }, [accessToken]);
  useEffect(() => {
    fetchAgentData();
  }, [fetchAgentData]);
  // To Display Agents From Server END
  const propertyId = localStorage.getItem("propertyId");
  const assignAgent = async (agentId) => {
    try {
      console.log("Request ID:", propertyId);
      console.log("Agent ID:", agentId);
      console.log("Type of Agent ID:", typeof agentId);

      const assignResponse = await axios.post(
        `http://localhost:8081/api/owner/properties/${propertyId}/assign?agentId=${agentId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Assignment Response:", assignResponse);
      window.location.href = "http://localhost:3000/owner/properties/all";
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [showModal, setShowModal] = useState([]);
  const toggleModal = (index) => {
    const newShowModal = [...showModal];
    newShowModal[index] = !newShowModal[index];
    setShowModal(newShowModal);
  };
  return (
    <div className="dashboard">
      <div className="app-container">
        <UserSideBarOwner></UserSideBarOwner>
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Choose Agents</h1>
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
                ID
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
                First Name
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
                Phone
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
                Age
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
                Score
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
                Amount Of Properties
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
                Choose Agent
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
          </div>
          <div className="products-area-wrapper tableView">
            {agentData.length > 0 ? (
              agentData.map((agent, index) => (
                <div key={agent.propertyId}>
                  <div className="products-row">
                    <div className="product-cell image">
                      <img
                        alt="product"
                        src="https://upload.wikimedia.org/wikipedia/en/e/ee/Agent_J_MIB11.jpg"
                      />
                      <span onClick={() => toggleModal(index)}>
                        {" "}
                        {agent.agentId}
                      </span>
                    </div>
                    <div className="product-cell category ">
                      <span onClick={() => toggleModal(index)}>
                        {agent.firstName}
                      </span>
                    </div>

                    <div className="product-cell category">
                      <span onClick={() => toggleModal(index)}>
                        {agent.phone}
                      </span>
                    </div>

                    <div className="product-cell category">
                      <span onClick={() => toggleModal(index)}>
                        {agent.age}
                      </span>
                    </div>
                    <div className="product-cell category">
                      <span onClick={() => toggleModal(index)}>
                        {agent.score}
                      </span>
                    </div>
                    <div className="product-cell category">
                      <span onClick={() => toggleModal(index)}>
                        {agent.amountOfProperties}
                      </span>
                    </div>
                    <div className="product-cell category">
                      <button
                        className="button-33"
                        onClick={() => assignAgent(agent.agentId)}
                      >
                        Assign {agent.firstName}
                      </button>
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
                        src="https://www.driggstitle.com/wp-content/uploads/2022/07/real-estate.jpeg"
                        alt="product"
                      />
                    </Modal.Header>
                    <Modal.Body className="back-color">
                      <Container>
                        <Row>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Agent ID: </span>
                              {agent.agentId}
                            </div>
                            <div className="center">
                              <span className="bold-info">User ID: </span>
                              {agent.userId}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">First Name: </span>
                              {agent.firstName}
                            </div>
                            <div className="center">
                              <span className="bold-info">Last Name: </span>
                              {agent.lastName}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Age: </span>
                              {agent.age}
                            </div>
                            <div className="center">
                              <span className="bold-info">Nationality: </span>
                              {agent.nationality}
                            </div>
                          </Col>
                        </Row>
                        <Row className="farther">
                          <Col>
                            <div className="center">
                              <span className="bold-info">Phone: </span>
                              {agent.phone}
                            </div>
                            <div className="center">
                              <span className="bold-info">gender:</span>
                              {agent.gender}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">Score: </span>
                              {agent.score}
                            </div>
                            <div className="center">
                              <span className="bold-info">Average Score:</span>
                              {agent.avgScore}
                            </div>
                          </Col>
                          <Col>
                            <div className="center">
                              <span className="bold-info">
                                Amount Of Requests:{" "}
                              </span>
                              {agent.amountOfRequests}
                            </div>
                            <div className="center">
                              <span className="bold-info">
                                Amount Of Properties:{" "}
                              </span>
                              {agent.amountOfProperties}
                            </div>
                          </Col>
                        </Row>
                        <Row className="farther"></Row>
                      </Container>

                      <div className="info">
                        <span className="bold-info">Info: </span>
                        <span className="additional-info">{agent.info}</span>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="back-color">
                      <Button variant="danger">Delete</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              ))
            ) : (
              <div>
                <div className="product-cell category">No Data</div>
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

export default ShowAgents;
