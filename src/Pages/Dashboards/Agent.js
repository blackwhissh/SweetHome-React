import React, { useEffect, useState } from "react";
import axios from "axios";
import { Logout } from "@mui/icons-material";

const Agent = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/agent", {
          headers: {
            Authorization:
              'Bearer ' + accessToken
          },
        });
        setUserData([response.data]); // Set the retrieved user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = async() => {
    localStorage.clear()
    window.location.href="/";
  }

  return (
    <div>
      <h1>Welcome Agent</h1>
      <table>
        <thead>
          <tr>
            <th>Agent ID</th>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Nationality</th>
            <th>Phone</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.clientId}>
              <td>{user.clientId}</td>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.nationality}</td>
              <td>{user.phone}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout} class="mui t">
        <Logout /> Logout
      </button>
    </div>
  );
};

export default Agent;
