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

const LinkCard = ({link}) => {

  console.log('im here', link);
  return (
    <Sheet
      variant="soft"
      color="neutral"
      className="flex flex-col  p-6 link-card rounded-md"
    >
      <div className="flex flex-col justify-start items-start gap-2 md:flex-row md:justify-between">
        <div className="flex gap-4">
          <div className=" hidden sm:flex">
            <Avatar alt={link.title || link.alias} color="neutral" variant="outlined" src={'url'}></Avatar>
          </div>
          <div className="flex flex-col gap-1 b">
            <span className="text-xl font-bold">{link.title || link.alias}</span>
            <a href="a" className="text-md text-blue-400 font-bold">
              {'42ln.k/'+link.alias}
            </a>
            <a href="a" className="text-sm text-blue-1000 break-all whitespace-normal overflow-hidden">
              {link.longUrl}
            </a>
            <div className="flex flex-col gap-2 mt-3 lg:flex-row flex-wrap">
              <div className="flex gap-2 items-center">
                <MdOutlineBarChart color="#536DFE" />
                <span className="text-[#536DFE]">20 vistes</span>
              </div>
              <div className="flex gap-2 items-center ">
                <BsCalendarDate />
                <span>{link.createdAt.split(' ')}</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {link?.categories?.map((e, i) => (
                  <Chip key={e.id} variant="soft" color="success">{e.title}</Chip>
                ))}
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
          <IconButton component="a" href="/edit/6876638863688" variant="outlined" color="neutral">
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
