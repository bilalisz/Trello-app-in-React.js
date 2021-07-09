import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const CardMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { card, onDeleteCard } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon style={{ color: "#fff", fontSize: "30px" }} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            onDeleteCard(card.id);
            handleClose;
          }}
          style={{ color: "red" }}
        >
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose}>Move All</MenuItem>
        <MenuItem onClick={handleClose}>Sort by Name</MenuItem>
        <MenuItem onClick={handleClose}>Sort Random</MenuItem>
      </Menu>
    </div>
  );
};

export default CardMenu;
