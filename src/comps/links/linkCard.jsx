import {
  Sheet,
  Avatar,
  Button,
  IconButton,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  ListItemDecorator,
  Chip,
  Divider,
} from "@mui/joy";

import { MdContentCopy } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoLinkOutline } from "react-icons/io5";
import { MdQrCode } from "react-icons/md";
import { MdOutlineBarChart } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";

const LinkCard = () => {
  return (
    <Sheet
      variant="soft"
	  color="neutral"
      className="flex flex-col  p-6 link-card rounded-md"
    >
      <div className="flex flex-col justify-start items-start gap-2 md:flex-row md:justify-between">
        <div className="flex gap-4">
          <div className=" hidden sm:flex">
            <Avatar alt="Youtube" color="neutral" variant="neutral"></Avatar>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold">My files</span>
            <a href="a" className="text-md text-blue-400 font-bold">
              bitly.co/6dd
            </a>
            <a href="a" className="text-sm text-blue-1000">
              https://wwww.my-site.ff/my-long-url.php?ok=true&v=start&index=4
            </a>
            <div className="flex flex-col gap-2 mt-3 lg:flex-row">
              <div className="flex gap-2 items-center">
                <MdOutlineBarChart color="#536DFE" />
                <span className="text-[#536DFE]">20 vistes</span>
              </div>
              <div className="flex gap-2 items-center ">
                <BsCalendarDate />
                <span>June 3 2024</span>
              </div>

              <div className="flex gap-2">
                <Chip variant="outlined">Web project#1</Chip>
              </div>
            </div>
          </div>
        </div>
        <Divider orientation=""></Divider>
        <div className="flex gap-2">
          <Button
            className=""
            variant="solid"
            color="neutral"
            startDecorator={<MdContentCopy />}
          >
            Copy
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            startDecorator={<MdShare />}
          >
            Share
          </Button>
          <IconButton variant="outlined" color="neutral">
            <MdModeEdit />
          </IconButton>

          <Dropdown>
            <MenuButton>
              <BsThreeDotsVertical />
            </MenuButton>
            <Menu>
              <MenuItem>
                <ListItemDecorator>
                  <MdDelete />
                </ListItemDecorator>
                Delete
              </MenuItem>
              <MenuItem>
                <ListItemDecorator>
                  <IoLinkOutline />
                </ListItemDecorator>
                View link details
              </MenuItem>
              <MenuItem>
                <ListItemDecorator>
                  <MdQrCode />
                </ListItemDecorator>
                Qr code
              </MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </div>
    </Sheet>
  );
};
export default LinkCard;
