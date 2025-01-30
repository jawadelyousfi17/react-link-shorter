import { Option, Select, Button, Avatar } from "@mui/joy";
import { CiLight } from "react-icons/ci";
import { BsMoon } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";

import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";

import { useAuth } from "../context/AuthContext";

const Navbar = ({ mode, setMode }) => {
  const handleChange = (event, newValue) => {
    setMode(newValue);
  };

  const { user, logout } = useAuth();

  const handleLogout = () => {
      logout()
  }

  return (
    <div className=" h-12 justify-between px-14 gap-2 flex items-center">
      {user && (
        <div className="flex gap-2">
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
              onClick={handleLogout}
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

      {!user && <div className="flex gap-2">
        
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
        </div>}

      <Select
        startDecorator={mode === "light" ? <CiLight /> : <BsMoon />}
        onChange={handleChange}
        defaultValue={mode}
      >
        <Option value="system">System </Option>
        <Option value="dark">Dark</Option>
        <Option value="light">Light </Option>
      </Select>
    </div>
  );
};

export default Navbar;
