import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import StatusComp from "./StatusComp";

const CardMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const {
    card,
    onDeleteCard,
    onOpenStatusModal,
    getCurrentCard,
    onSortByName,
    onRandomSort,
  } = props;

  const handleClick = (event) => {
    console.log(event.currentTarget);
    console.log("card", card);
    getCurrentCard(card.id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log("I am here");
  };

  const handleDelete = () => {
    onDeleteCard(card.id);
    handleClose;
  };

  const handleSortByName = () => {
    handleClose;
    console.log("sort by name", card.id);
    onSortByName(card.id);
  };

  const handleSortRandom = () => {
    handleClose;
    console.log("sort Random", card.id);
    onRandomSort(card.id);
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
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </MenuItem>
        <MenuItem onClick={onOpenStatusModal}>Move All</MenuItem>
        <MenuItem onClick={handleSortByName}>Sort by Name</MenuItem>
        <MenuItem onClick={handleSortRandom}>Sort Random</MenuItem>
      </Menu>
    </div>
  );
};

export default CardMenu;
