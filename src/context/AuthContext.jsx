import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const called = useRef(false);

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

  useEffect(() => {
    const checkAuth = async () => {
      if (called.current) return;
      called.current = true;
      setLoading(true);
      const token = localStorage.getItem("token") || " ";
      console.log("message from authcontext", token);
      if (token) {
        try {
          const res = (
            await axios.get("http://localhost:3000/user/verify", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          ).data;
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUser(res.data.user);
          setIsAuth(true);
        } catch (error) {
          if (error?.status === 403) {
            console.log(error);
            try {
              const newAccessToken = await refreshAccessToken();
              const res = (
                await axios.get("http://localhost:3000/user/verify", {
                  headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                })
              ).data;
              localStorage.setItem("user", JSON.stringify(res.data.user));
              setUser(res.data.user);
              setIsAuth(true);
            } catch (error) {
              setIsAuth(false);
              localStorage.removeItem("user");
            }
          } else {
            setIsAuth(false);
            localStorage.removeItem("user");
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credential) => {
    setLoading(true);
    setError(null);
    try {
      const response = (
        await axios.post("http://localhost:3000/user/login", credential, {
          withCredentials: true,
        })
      ).data;
      const data = response.data;
      console.log(data.user);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      localStorage.removeItem("user");
      const res = error.response;
      if (res.status === 400) setError(res.data.message);
      else setError("unkown error, try again");
    }
    setLoading(false);
  };

  const signup = async (credential) => {
    setLoading(true);
    setError(null);
    return new Promise(async (resolve, reject) => {
      try {
        const response = (
          await axios.post("http://localhost:3000/user/signup", credential, {
            withCredentials: true,
          })
        ).data;
        const data = response.data;
        console.log(data.user);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        localStorage.setItem("user", JSON.stringify(data.user));
        resolve(true)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        localStorage.removeItem("user");
        const res = error.response;
        console.log(res);
        if (res.status === 400)  reject({message : res.data.error.message});
        else  reject({message : "Unkown error has occured"});
      }
    })
  };

  const logout = async () => {
    setIsAuth(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    try {
      await axios.post(
        "http://localhost:3000/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        loading,
        error,
        login,
        logout,
        isAuth,
        signup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
