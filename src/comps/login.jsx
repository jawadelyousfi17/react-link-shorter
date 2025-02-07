import { Button, Input, Sheet, Divider, Chip, Alert } from "@mui/joy";
import { data, useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuLockKeyhole } from "react-icons/lu";
import { Fragment, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";


import Google from "../assets/google.png";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errParam, setErrorParams] = useState(null)
  const { login, loading, error, isAuth } = useAuth();
  if (isAuth) return navigate("/");
  const navigate = useNavigate();
  const handleLogin = async () => {
    await login({ email: username, password });
    navigate("/dashboard");
  };
  const handleGoogleLogin = async () => {
    try {
      const {
        data: { url },
      } = await axios.get("http://localhost:3000/user/auth/google/url");
      window.location = url
    } catch (error) {
      navigate('/login?error=error')
    }
  };
  useEffect(() => {
    console.log('object', isAuth);
    const params = new URLSearchParams(window.location.search)
    const errorParam = params.get("error")
    if (errorParam) setErrorParams('Error login : ', errParam)
  },[])

  return (
    <div className="w-full md:h-screen mt-28 md:mt-0 flex flex-col justify-center items-center login-div">
      <Sheet
        variant="outlined"
        className="max-w-96 flex flex-col gap-4 p-4 rounded-sm"
      >
        Login to your account
        {error && (
          <Alert variant="soft" color="danger">
            {error}
          </Alert>
        )}{" "}

        {errParam && (
           <Alert variant="soft" color="danger">
           {errParam}
         </Alert>
        )}


<Button
            onClick={handleGoogleLogin}
            color="primary"
            variant="outlined"
            startDecorator={<img className="h-6" src={Google}></img>}
            className="w-full"
          >
            Google
          </Button>

          <Divider>OR</Divider>

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          startDecorator={<MdOutlineAlternateEmail />}
          size="md"
          placeholder="Username"
          variant="outlined"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          startDecorator={<LuLockKeyhole />}
          size="md"
          placeholder="Password"
          endDecorator={
            <Fragment>
              <Button
                color="neutral"
                variant="plain"
                endDecorator={<FaEye />}
              ></Button>
            </Fragment>
          }
        />

        <Button loading={loading} onClick={handleLogin}>
          log in
        </Button>
        <div className="flex felx-row gap-2">
          Don&apos;t have an acoount ?
          <Chip component="a" href="/signup" variant="outlined">
            create one.
          </Chip>
        </div>
      </Sheet>
    </div>
  );
};

export default Login;
