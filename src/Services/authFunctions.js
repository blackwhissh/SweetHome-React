import axios from "axios";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  let accessToken = localStorage.getItem("accessToken");

  if (!refreshToken) {
    window.location.href = "http://localhost:3000/login/";
  } else {
    try {
      const refreshResponse = await axios.post(
        "http://localhost:8081/api/auth/refreshtoken",
        {
          refreshToken: refreshToken,
        }
      );
      const newAccessToken = refreshResponse.data.accessToken;
      console.log("Refresh token worked", newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
      accessToken = newAccessToken;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();

        window.location.href = "http://localhost:3000/login/";
      }
      console.error("Error refreshing access token:", error);
    }
  }
  return accessToken;
};

export const fetchUserData = async (
  accessToken,
  setUserData,
  retryCount = 3
) => {
  try {
    let currentRole = localStorage.getItem("userRole");
    let endPoint = `http://localhost:8081/api/${currentRole}`;
    if (window.location.pathname.includes("/properties")) {
      if (window.location.pathname.includes("/properties/all")) {
        endPoint += "/properties/all";
      } else {
        endPoint += "/properties/active";
      }
    } else if (window.location.pathname.includes("/requests/active")) {
      endPoint += "/requests/active";
    } else if (window.location.pathname.includes("/requests/all")) {
      endPoint += "/requests/all";
    } else if (window.location.pathname.includes("/requests/agents")) {
      endPoint += "/requests/agents";
    }
    // console.log(endPoint);
    const response = await axios.get(endPoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setUserData([response.data]); // Set the retrieved user data in state
    // console.log(response.data);
  } catch (error) {
    if (error.response && error.response.status === 401 && retryCount > 0) {
      const newAccessToken = await refreshAccessToken(); // Perform token refresh
      await fetchUserData(newAccessToken, setUserData, retryCount - 1); // Retry fetching data
    } else {
      console.error("Error fetching user data:", error);
      // window.location.href = 'http://localhost:3000/login/';
    }
  }
};
export const handleLogOut = async () => {
  localStorage.clear();
  window.location.href = "/";
};
