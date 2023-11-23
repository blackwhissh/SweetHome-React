import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../../../Css/Dashboard.css";
import { Logout } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const unClickAble = function () {
  alert("You think you cool????");
};
const accessToken = localStorage.getItem("accessToken");

const Client = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "",
    age: "",
    gender: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8081/api/client/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserData([response.data]);
      window.location.reload();
    } catch (error) {
      console.log("not working");
    }
  };
  const [userData, setUserData] = useState([]);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const refreshResponse = await axios.post(
        "http://localhost:8081/api/auth/refreshtoken",
        {
          refreshToken: refreshToken,
        }
      );
      const newAccessToken = refreshResponse.data.accessToken;
      console.log(refreshAccessToken);
      alert("works");

      localStorage.setItem("accessToken", newAccessToken);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "http://localhost:3000/home";
      }
      console.error("error refreshing access token:", error);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async (retryCount) => {
      try {
        const response = await axios.get("http://localhost:8081/api/client", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData([response.data]); // Set the retrieved user data in state
      } catch (error) {
        if (error.response && error.response.status === 400 && retryCount > 0) {
          await refreshAccessToken(); // Perform token refresh
          await fetchUserData(retryCount - 1); // to send to the server 3 times only
          console.log("refresh token worked");
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const maxRetries = 3;
    fetchUserData(maxRetries);
  }, [refreshAccessToken]);

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <div className="app-container">
        <div className="sidebar">
          <div className="sidebar-header"></div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item active">
              <Link to="/client">
                <svg
                  xmlns="http://www.w6.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home"
                >
                  <path d="M6 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 6 15 6 15 22" />
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/client/request">
                <svg
                  xmlns="http://www.w6.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-shopping-bag"
                >
                  <path d="M6 2L6 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-6-4z" />
                  <line x1="6" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>Requests</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <a href="/">
                <svg
                  xmlns="http://www.w6.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-pie-chart"
                >
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.86" />
                  <path d="M22 6A10 10 0 0 0 6 2v10z" />
                </svg>
                <span>Statistics</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/">
                <svg
                  xmlns="http://www.w6.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-inbox"
                >
                  <polyline points="22 6 16 6 14 15 10 15 8 6 2 6" />
                  <path d="M5.45 5.11L2 6v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-6.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
                <span>Inbox</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/">
                <svg
                  xmlns="http://www.w6.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bell"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-6 9-6 9h18s-6-2-6-9" />
                  <path d="M16.76 21a2 2 0 0 1-6.46 0" />
                </svg>
                <span>Notifications</span>
              </a>
            </li>
          </ul>
          <div className="account-info">
            <div className="account-info-picture">
              <img
                src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                alt="Account"
              />
            </div>
            <div className="account-info-name">Nikusha</div>
            <button className="account-info-more">
              <svg
                xmlns="http://www.w6.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-horizontal"
              >
                <circle cx="6" cy="6" r="1" />
                <circle cx="19" cy="6" r="1" />
                <circle cx="5" cy="6" r="1" />
              </svg>
            </button>
          </div>
        </div>
        <div className="app-content">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 ">
                <form className="w-75">
                  {userData.map((user) => (
                    <div key={user.clientId}>
                      <div className="display-4 mb-4">
                        Welcome {user.firstName}
                      </div>
                      <div className="h4 mb-4">Your Personal Information</div>

                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="firstName"
                          placeholder="First Name"
                          value={user.firstName}
                          disabled
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="lastName"
                          placeholder="Last Name"
                          value={user.lastName}
                          disabled
                        />
                        <input
                          type="tel"
                          className="form-control mb-2"
                          name="phone"
                          placeholder="Phone Number"
                          value={user.phone}
                          disabled
                        />
                        <input
                          type="number"
                          className="form-control mb-2"
                          name="age"
                          placeholder="Age"
                          value={user.age}
                          disabled
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="nationality"
                          placeholder="Nationality"
                          value={user.nationality}
                          disabled
                        />
                      </div>
                      <div className="mx-5 mb-3 mt-3 d-flex align-items-center">
                        <label className="form-label me-3 mt-2">Gender</label>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label me-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              checked={user.gender === "MALE"}
                              value="MALE"
                              disabled
                            />
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              value="FEMALE"
                              checked={user.gender === "FEMALE"}
                              disabled
                            />
                            Female
                          </label>
                        </div>
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          onClick={unClickAble}
                          className="btn btn-primary"
                          type="button"
                          disabled
                        >
                          You can't click me buahaha
                        </button>
                      </div>
                    </div>
                  ))}
                </form>
              </div>

              <div className="col-md-6">
                <form onSubmit={handleSubmit} className="w-75">
                  <div className="display-4 mb-4">Edit</div>
                  <div className="h4 mb-4">Your Personal Information</div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="lastName"
                      value={formData.lastName}
                      placeholder="Last Name"
                      onChange={handleChange}
                    />

                    <input
                      type="tel"
                      className="form-control mb-2"
                      name="phone"
                      value={formData.phone}
                      placeholder="Phone Number"
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="nationality"
                      placeholder="Nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                    />
                    <div className="mx-5 mb-3 mt-3 d-flex align-items-center">
                      <label className="form-label me-3 mt-2">Gender</label>
                      <RadioGroup
                        row
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          sx={{
                            display: "inline-block",
                            alignItems: "center",
                          }}
                          control={<Radio />}
                          label="Male"
                          value="MALE"
                        />
                        <FormControlLabel
                          sx={{
                            display: "inline-block",
                            alignItems: "center",
                          }}
                          control={<Radio />}
                          label="Female"
                          value="FEMALE"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">
                      Change information
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="dash-button">
            <Logout /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;
