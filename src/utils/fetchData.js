// src/utils/fetchData.js
import axios from "axios";

// Function to refresh the access token
const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to refresh token");
    }
  };


// Main fetchData function
const fetchData = async (url, options = {}) => {
  try {
    let accessToken = localStorage.getItem("token");

    // Make the request
    const response = await axios({
      method: options.method || "GET", // Default to GET if no method is provided
      url: `http://localhost:3000${url}`, // Base URL of your API
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: options.body, // Include request body for POST/PUT/PATCH
    });

    return response.data; // Return the response data
  } catch (error) {
    // if (error.response?.status === 401) {
    //   // Access token expired, try refreshing it
    //   try {
    //     const newAccessToken = await refreshAccessToken();
    //     const retryResponse = await axios({
    //       method: options.method || "GET",
    //       url: `http://localhost:3000${url}`,
    //       headers: {
    //         Authorization: `Bearer ${newAccessToken}`,
    //         ...options.headers,
    //       },
    //       data: options.body,
    //       ...options,
    //     });
    //     return retryResponse.data;
    //   } catch (refreshError) {
    //     // Refresh token also expired or invalid
    //     localStorage.removeItem("token");
    //     window.location.href = "/login"; // Redirect to login
    //   }
    // }
    throw error;
  }
};

export default fetchData;