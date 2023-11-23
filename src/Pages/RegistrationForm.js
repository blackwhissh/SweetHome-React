import React, { useState } from "react";
import axios from "axios";
// c6a64b2d-4d4a-43a8-a7e5-25c541ea191f
// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzczNDkyLCJleHAiOjE3MDA3NzcwOTJ9.CC-0xGIDliWDs2CsJPnmeBTwNmfg296yQAlNK-n_7xg
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "asd",
    lastName: "asd",
    email: "asd@gmail.com",
    password: "12345678999",
    gender: "MALE",
    phone: "593141427",
    nationality: "georgia",
    age: "65",
  });
  // 99e40b4d-b3d9-43b0-8d09-c180f119b8cb

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/register/client",
        formData
      );
      console.log("Registration successful:", response.data);
      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </label>

        <br />
        <label>
          age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          nationality:
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
