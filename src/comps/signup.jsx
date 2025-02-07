import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Input,
  Sheet,
  Divider,
  Chip,
  LinearProgress,
  Alert,
} from "@mui/joy";

import axios from "axios";

import Google from "../assets/google.png";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuLockKeyhole } from "react-icons/lu";
import { FaEye, FaG } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { TbAbc } from "react-icons/tb";

const Signup = () => {
  const [email, setEmail] = useState("jawad.pro17@gmail.com");
  const [password, setPassword] = useState("Jawad.180");
  const [name, setName] = useState("jawad");
  const [date, setDate] = useState("11-25-2000");
  const [passStrngth, setPassStr] = useState("danger");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    date: false,
  });
  const [errorR, setError] = useState("please corrcet those fields");
  const navigate = useNavigate();
  const { loading, signup, error } = useAuth();

  useEffect(() => {
    setScore(getPasswordStrength());
    const v = ["danger", "warning", "primary", "success", "success"];
    setPassStr(v[parseInt(getPasswordStrength() / 20)]);
  }, [password]);

  useEffect(() => {
    setError(errors.date || errors.email || errors.password || errors.name);
  }, [errors]);

  const getPasswordStrength = () => {
    if (!password) return 0;
    let passLen = password.length * 2;
    if (passLen >= 20) passLen = 20;
    const upperCase = /[A-Z]/.test(password) ? 1 : 0;
    const numbers = /\d/.test(password) ? 1 : 0;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 1 : 0;
    const score = passLen + (upperCase + 0 + numbers + specialChars) * 22;
    if (score >= 100) return 100;
    return score;
  };

  const handleSignup = async () => {
    const data = { email, password, name, date };
    if (score < 80)
      return setErrors((errors) => ({ ...errors, password: true }));
    if (email !== undefined && email.length < 6)
      return setErrors((errors) => ({ ...errors, email: true }));
    if (name !== undefined && name.length == 0)
      return setErrors((errors) => ({ ...errors, name: true }));
    if (date === undefined)
      return setErrors((errors) => ({ ...errors, date: true }));
    try {
      await signup({ name, email, password });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const {
        data: { url },
      } = await axios.get("http://localhost:3000/user/auth/google/url");
      window.location = url;
    } catch (error) {
      alert(error)
      navigate("/login?error=error");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center login-div">
      <Sheet
        variant="outlined"
        sx={{
          maxWidth : '360px'
        }}
        className="m-w-40  flex flex-col gap-4 p-4 rounded-sm"
      >
        create an account
        {errorR && (
          <Alert variant="outlined" color="warning">
            {errorR}
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
          variant="outlined"
          value={email}
          color={errors.email ? "danger" : "neutral"}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: false });
          }}
          startDecorator={<MdOutlineAlternateEmail />}
          size="md"
          placeholder="Email"
        />
        <Input
          variant="outlined"
          value={password}
          color={errors.password ? "danger" : "neutral"}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({ ...errors, password: false });
          }}
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
        <div className="flex flex-col gap-1">
          <span className="text-sm"> password strength</span>
          <LinearProgress
            color={passStrngth}
            determinate
            size="sm"
            value={score}
          />
        </div>
        <Input
          value={name}
          variant="outlined"
          color={errors.name ? "danger" : "neutral"}
          onChange={(e) => {
            setName(e.target.value);
            setErrors({ ...errors, name: false });
          }}
          startDecorator={<TbAbc />}
          size="md"
          placeholder="Name"
        />
        <div className="flex flex-col gap-1">
          Birth date
          <Input
            variant="outlined"
            value={date}
            color={errors.date ? "danger" : "neutral"}
            onChange={(e) => {
              setDate(e.target.value);
              setErrors({ ...errors, date: false });
            }}
            placeholder="Birth day"
            type="date"
          ></Input>
        </div>
        <Button loading={loading} onClick={handleSignup}>
          Signup
        </Button>
        <div className="flex felx-row gap-2">
          Already have an account ?
          <Chip component="a" href="/login" variant="outlined">
            Log in.
          </Chip>
        </div>
      </Sheet>
    </div>
  );
};

export default Signup;
