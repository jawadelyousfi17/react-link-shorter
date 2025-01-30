import { Sheet, Avatar, Button, IconButton, Dropdown, MenuButton, Menu, MenuItem, ListItemDecorator, Chip } from "@mui/joy";

import { MdContentCopy } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoLinkOutline } from "react-icons/io5";
import { MdQrCode } from "react-icons/md";
import { MdOutlineBarChart } from "react-icons/md";


const LinkCard = () => {
  return (
    <Sheet
      variant="outlined"
      className="flex flex-col  p-6 link-card rounded-md"
    >
      <div className="flex justify-between items-start">
        <div className="flex justify-start gap-4">
          <div>
            <Avatar alt="Youtube" color="neutral" variant="soft"></Avatar>
          </div>
          <div className="flex flex-col gap-1">
            <span>My files</span>
            <span>bitly.co/6dd</span>
            <span>
              https://wwww.my-site.ff/my-long-url.php?ok=true&v=start&index=4
            </span>
            <div className="flex gap-2 mt-3">
              <span>16-oct-2024</span>
              <div className="flex gap-2">
				<MdOutlineBarChart/>
				20 visits</div>
              <div className="flex gap-2">
				<Chip variant="outlined">Web project#1</Chip>
			  </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="soft"
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
					<MdDelete/>
					</ListItemDecorator>
					Delete
				</MenuItem>
				<MenuItem>
					<ListItemDecorator>
					<IoLinkOutline/>
					</ListItemDecorator>
					View link details
				</MenuItem>
				<MenuItem>
					<ListItemDecorator>
					<MdQrCode/>
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
