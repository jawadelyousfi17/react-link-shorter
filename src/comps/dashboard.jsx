import {
  Button,
  Input,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  ListItemDecorator,
  Divider,
} from "@mui/joy";
import LinkCard from "./links/linkCard";

import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineBarChart } from "react-icons/md";
import { IoArrowUpSharp } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";
import { MdRefresh } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 md:p-8 p-1 w-fit mx-auto">
      <div className="flex gap-2 justify-end">
        <Button variant="soft" startDecorator={<FaPlus />}>
          Create link
        </Button>
      </div>
      <div className="flex gap-2">
        <Input variant="soft" startDecorator={<IoSearch />} placeholder="Search link" />
        <Dropdown>
          <MenuButton variant="soft">Sort</MenuButton>
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
        <Button variant="soft" startDecorator={<MdRefresh />}>Refresh</Button>
      </div>
      <LinkCard></LinkCard>
	  <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard>
      <LinkCard></LinkCard>

    </div>
  );
};

export default Dashboard;
