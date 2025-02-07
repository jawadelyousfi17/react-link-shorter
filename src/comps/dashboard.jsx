import {
  Button,
  Input,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  ListItemDecorator,
  Divider,
  CircularProgress,
} from "@mui/joy";

import LinkCard from "./links/linkCard";
import Loader from "./loader";

import axios from "axios";
import { useAuth } from "../context/AuthContext";

import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineBarChart } from "react-icons/md";
import { IoArrowUpSharp } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";
import { MdRefresh } from "react-icons/md";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { isAuth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuth) {
        const token = localStorage.getItem("token") || "";
        console.log("Token:", token);

        try {
          const response = await axios.get(
            "http://localhost:3000/link/getall",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Data:", response.data);
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(true);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuth]);

  return (
    <div className="flex flex-col gap-4 md:p-8 p-4 w-fit mx-auto">
      <div className="flex gap-2 justify-between items-center">
        <span className="text-3xl font-bold">42 links</span>
        <Button
          component="a"
          href="/create"
          variant="solid"
          startDecorator={<FaPlus />}
        >
          Create link
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Input
          variant="outlined"
          className=" grow-1"
          startDecorator={<IoSearch />}
          placeholder="Search link"
        />
        <Dropdown>
          <MenuButton variant="outlined">Sort</MenuButton>
          <Menu>
            <MenuItem>
              <ListItemDecorator>
                <BsCalendarDate />
              </ListItemDecorator>
              Date
            </MenuItem>
            <MenuItem>
              <ListItemDecorator>
                <MdOutlineBarChart />
              </ListItemDecorator>
              Visites
            </MenuItem>
            <Divider></Divider>
            <MenuItem>
              <ListItemDecorator>
                <IoArrowUpSharp />
              </ListItemDecorator>
              Up
            </MenuItem>
            <MenuItem>
              <ListItemDecorator>
                <FaArrowDown />
              </ListItemDecorator>
              Down
            </MenuItem>
          </Menu>
        </Dropdown>
        <div className="hidden md:flex">
          <Button variant="soft" startDecorator={<MdRefresh />}>
            Refresh
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center md:load">
          {" "}
          <CircularProgress></CircularProgress>
        </div>
      )}

      {data?.map((e, i) => (
        <LinkCard link={e}></LinkCard>
      ))}

      {/* <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard> */}
    </div>
  );
};

export default Dashboard;
