import { createContext, useContext, useEffect, useState } from "react";
import axios
  from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)
      const token = localStorage.getItem('token')
      console.log(token)
      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          localStorage.setItem("user", JSON.stringify(res.data.user))
          setUser(res.data.user)
          setIsAuth(true)
        } catch (error) {
            setIsAuth(false)
            localStorage.removeItem("user")
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (credential) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post("http://localhost:5000/login", credential)
      const data = response.data
      localStorage.setItem('token', data.token)
      setUser(data.user)
      setIsAuth(true)
      localStorage.setItem("user",JSON.stringify(data.user))
    } catch (error) {
      localStorage.removeItem('user')
      const res = error.response
      if (res.status === 401)
        setError(res.data.message)
      else setError("unkown error, try again")
    }
    setLoading(false)
  }

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
