import { Tooltip } from "@mui/material";
import { Icons } from "./Icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center py-[0.85rem] px-4 w-full bg-[#181818]">
      <Tooltip title="Go to homepage" placement="bottom">
        <Link to="/" className="size-8">
          <Icons.gitHub className="fill-white" />
        </Link>
      </Tooltip>
    </div>
  );
};

export default Header;
