import { Button, Input, Sheet, Divider, Chip } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuLockKeyhole } from "react-icons/lu";
import { Fragment, useState } from "react";
import { FaEye, FaG } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState();
  const {login} = useAuth()
  const navigate = useNavigate()
  const handleLogin = () => {
      login({name : username || "jel-yous"})
      navigate("/dashboard")
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center login-div">
      <Sheet
        variant="outlined"
        className="max-w-96 flex flex-col gap-4 p-4 rounded-sm"
      >
        Login to your account
        <Input
        onChange={(e) => setUsername(e.target.value)}
          startDecorator={<MdOutlineAlternateEmail />}
          size="md"
          placeholder="Username"
        />
        <Input
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
        <Divider orientation="horizental"></Divider>
        <div className="flex gap-4">
          <Button
            color="neutral"
            variant="soft"
            startDecorator={<FaGithub />}
            className="w-full"
          ></Button>
          <Button
            color="neutral"
            variant="soft"
            startDecorator={<FaGoogle />}
            className="w-full"
          ></Button>
        </div>
        <Button onClick={handleLogin}>log in</Button>
        <div className="flex felx-row gap-2">
          Don't have an acoount ?
          <Chip component="a" href="/signup" variant="soft">
            create one.
          </Chip>
        </div>
      </Sheet>
    </div>
  );
};

export default Login;
