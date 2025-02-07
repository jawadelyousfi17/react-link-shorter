import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types"; // Import prop-types for validation
import axios from "axios";

// Create the context
export const LoginContext = createContext();

// Create the provider component
export const LoginProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const login = async (url, data) => {
    setLoading(true);
    setError(null);
    setResponseData(null);

	try {
		console.log(url, data);
		const response = await axios.post(url, data)
		return response.data	
	} catch (err) {
		setError("Cannot login, check ur info")
		return null
	} finally {
		setLoading(false)
	}

    
  };

  return (
    <LoginContext.Provider value={{ loading, error, responseData, login }}>
      {children}
    </LoginContext.Provider>
  );
};

// Add prop-types validation for the children prop
LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the LoginContext
export const useLogin = () => useContext(LoginContext);