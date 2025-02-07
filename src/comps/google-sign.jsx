import axios from "axios";

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const GoogleCallbacl = () => {
  const called = useRef(false);
  const navigate = useNavigate()
  const {isAuth, setUser, setIsAuth} = useAuth()
  useEffect(() => {
    const params = window.location.search;
    const getToken = async () => {
      try {
        if (called.current) return;
        called.current = true;
        const {
          data: { data },
        } = await axios.post(
          "http://localhost:3000/user/auth/google/token?" + params,
          {},
          {
            withCredentials: true,
          }
        );
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
        setIsAuth(true)
        navigate('/')
      } catch (error) {  
        let er = 'Unkownk'
        if (error.response.status === 401) er = error.response.data.message
        navigate('/login?error='+er)
      }
    };
    getToken();
  }, []);
};

export default GoogleCallbacl;
