import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Css/Dashboard.css";
import { Logout } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  refreshAccessToken,
  fetchUserData,
  handleLogOut,
} from "../../../Services/authFunctions";
import UserSideBar from "../../../Components/UserSideBar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const unClickAble = function () {
  alert("You think you cool????");
};
var accessToken = localStorage.getItem("accessToken");
var currentRole = localStorage.getItem("userRole");
const Client = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "",
    age: "",
    gender: "MALE",
  });
  const [formPassData, setFormPassData] = useState({
    newPassword: "",
    oldPassword: "",
  });
  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setFormPassData({ ...formPassData, [name]: value });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e, refresh) => {
    refresh = 1;
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8081/api/${currentRole}/update`,
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
      if (error.response && error.response.status === 401 && refresh > 0) {
        refresh--;
        console.log(`editing profile did not work cause: ${error}`);
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("test");
      const responsePass = await axios.put(
        `http://localhost:8081/api/${currentRole}/update-password`,
        formPassData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserData([responsePass.data]);
      window.location.reload();
    } catch (error) {
      console.log(`editing password did not work cause: ${error}`);
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
  //  importing refreshToken and accessToken auth END

  return (
    <div className="dashboard">
      <div className="app-container">
        <UserSideBar></UserSideBar>

        <div className="container  d-flex justify-content-center   mt-5">
          <div className="row">
            <div className="col-md-6 ">
              <form className="w-75">
                {userData.map((user) => (
                  <div key={user.clientId}>
                    <div className="display-4 mb-4  text-lg-center">
                      Welcome {user.firstName}{" "}
                      {localStorage.setItem("username", user.firstName)}
                    </div>

                    <div className="h4 mb-4  text-lg-center">
                      Your Personal Information
                    </div>

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
              <form onSubmit={handleSubmit} className="w-75 ">
                <div className="display-4 mb-4 text-lg-center">Edit</div>
                <div className="h4 mb-4  text-lg-center">
                  Your Personal Information
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    autoComplete="given-name"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    className="form-control mb-2"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Last Name"
                    autoComplete="family-name"
                    onChange={handleChange}
                  />

                  <input
                    type="tel"
                    className="form-control mb-2"
                    name="phone"
                    value={formData.phone}
                    placeholder="Phone Number"
                    autoComplete="tel"
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
                    autoComplete="country-name"
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
            <div className="container me-5 mt-2 col-md-8 ">
              <form onSubmit={handlePasswordSubmit} className="w-50">
                {userData.map((user) => (
                  <div key={user.clientId}>
                    <div className="h4 mb-1 mt-5 text-lg-center">
                      Dear {user.firstName}
                    </div>
                    <div className="h4 mb-4 text-lg-center">
                      Want New Password? No Problem Mate
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control mb-2"
                        name="oldPassword"
                        placeholder="Your Password"
                        value={formPassData.oldPassword}
                        onChange={handlePassChange}
                      />
                      <input
                        type="password"
                        className="form-control mb-2"
                        name="newPassword"
                        placeholder="New Password"
                        value={formPassData.newPassword}
                        onChange={handlePassChange}
                      />
                    </div>
                  </div>
                ))}

                <div className="d-grid gap-2">
                  <button className="btn btn-success" type="submit">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <button onClick={handleLogOut} className="dash-button p-2 btn-color">
          <Logout /> Logout
        </button>
      </div>
    </div>
  );
};

export default Client;
