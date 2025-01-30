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
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuLockKeyhole } from "react-icons/lu";
import { FaEye, FaG } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { TbAbc } from "react-icons/tb";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [passStrngth, setPassStr] = useState("danger");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    date: false,
  });
  const [error, setError] = useState(false);

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

  const handleSignup = () => {
    const data = { email, password, name, date };
    if (score < 80) setErrors((errors) => ({ ...errors, password: true }));
    if (email !== undefined && email.length < 6)
      setErrors((errors) => ({ ...errors, email: true }));
    if (name !== undefined && name.length == 0)
      setErrors((errors) => ({ ...errors, name: true }));
    if (date === undefined) setErrors((errors) => ({ ...errors, date: true }));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center login-div">
    <Sheet
      variant="outlined"
      className="m-w-96 flex flex-col gap-4 p-4 rounded-sm"
    >
      create an account
      {error && (
        <Alert variant="soft" color="warning">
          please correct those fields
        </Alert>
      )}
      <Input
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
        password strength
        <LinearProgress
          color={passStrngth}
          determinate
          size="sm"
          value={score}
        />
      </div>
      <Input
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
          color={errors.date ? "danger" : "neutral"}
          onChange={(e) => {
            setDate(e.target.value);
            setErrors({ ...errors, date: false });
          }}
          placeholder="Birth day"
          type="date"
        ></Input>
      </div>
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
      <Button onClick={handleSignup}>Signup</Button>
      <div className="flex felx-row gap-2">
        Already have an account ?
        <Chip component="a" href="/login" variant="soft">
          Log in.
        </Chip>
      </div>
    </Sheet>
    </div>
  );
};

export default Signup;
