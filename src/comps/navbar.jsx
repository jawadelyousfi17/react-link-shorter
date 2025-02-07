import {
  Option,
  Select,
  Button,
  Avatar,
  Dropdown,
  MenuButton,
  Sheet,
  Menu,
} from "@mui/joy";

import { useColorScheme } from "@mui/joy/styles";

import { CiLight } from "react-icons/ci";
import { BsMoon } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";

import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = ({ mode, setMode }) => {
  const { systemMode } = useColorScheme()
  const effectiveMode = mode === "system" ? systemMode : mode
  const handleChange = (event, newValue) => {
    setMode(newValue);
  };

  const [user, setUser] = useState(null)
  const {isAuth, logout} = useAuth()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')) || null)
  }, [isAuth])


  return (

    <Sheet className={`${effectiveMode === "dark" ? "nav-dark" : "nav-light"} h-12 justify-between`}
        sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100, 
        backdropFilter: "blur(10px)", 
        backgroundColor: effectiveMode === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.6)", // Theme-aware transparency
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
      }}  
    >
      {user && (
        <div className="flex md:hidden">
          <Dropdown>
            <MenuButton
              variant="plain"
              startDecorator={<FiUser />}
              endDecorator={<MdKeyboardArrowDown />}
            >
              {user.name}
            </MenuButton>
            <Menu>
              <Button
                component="a"
                variant="plain"
                color="neutral"
                href="#my-profile"
                startDecorator={<FiUser />}
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                My account
              </Button>{" "}
              <Button
                onClick={logout}
                variant="plain"
                color="neutral"
                startDecorator={<IoLogOutOutline />}
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                Log out
              </Button>{" "}
              <Button
                sx={{
                  justifyContent: "flex-start",
                }}
                component="a"
                variant="plain"
                color="neutral"
                href="#as-link"
              >
                Settings
              </Button>
              <Button
                sx={{
                  justifyContent: "flex-start",
                }}
                component="a"
                variant="plain"
                color="neutral"
                href="#as-link"
              >
                Dashboard
              </Button>
            </Menu>
          </Dropdown>
        </div>
      )}
      {user && (
        <div className="gap-2 hidden md:flex">
          <Dropdown>
            <MenuButton
              variant="plain"
              color="neutral"
              startDecorator={<Avatar size="sm" alt={user.name} />}
              endDecorator={<MdKeyboardArrowDown />}
            >
              {user ? user.name : "Me"}
            </MenuButton>
            <Menu>
              <Button
                component="a"
                variant="plain"
                color="neutral"
                href="#my-profile"
                startDecorator={<FiUser />}
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                My account
              </Button>
              <Button
                onClick={logout}
                variant="plain"
                color="neutral"
                startDecorator={<IoLogOutOutline />}
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                Log out
              </Button>
            </Menu>
          </Dropdown>

          <Button component="a" variant="plain" color="neutral" href="#as-link">
            Settings
          </Button>
          <Button
            component="a"
            variant="plain"
            color="primneutralary"
            href="/dashboard"
          >
            Dashboard
          </Button>
        </div>
      )}

      {!user && (
        <div className="flex gap-2">
          <Button
            component="a"
            variant="plain"
            color="primneutralary"
            href="/login"
          >
            Login
          </Button>
          <Button
            component="a"
            variant="plain"
            color="primneutralary"
            href="/signup"
          >
            Sign up
          </Button>
        </div>
      )}

      <Select
        startDecorator={mode === "light" ? <CiLight /> : <BsMoon />}
        onChange={handleChange}
        defaultValue={mode}
      >
        <Option value="system">System </Option>
        <Option value="dark">Dark</Option>
        <Option value="light">Light </Option>
      </Select>
    </Sheet>
  );
};

export default Navbar;
