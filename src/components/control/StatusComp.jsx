import React from "react";
import {
  DialogTitle,
  Dialog,
  TextField,
  MenuItem,
  Button,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((thems) => ({
  root: {
    width: "100%",
  },
  DialogContent: {
    display: "flex",
    flexDirection: "column",
  },
}));

const StatusComp = (props) => {
  const classes = useStyles();
  const { onCloseModal, selectStatus, open, cards, getStatus, onMoveall } =
    props;

  const handleChange = (e) => {
    getStatus(e.target.value);
  };

  return (
    <Dialog
      onClose={onCloseModal}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Move All Items</DialogTitle>
      <DialogContent dividers className={classes.DialogContent}>
        <form onSubmit={onMoveall}>
          <TextField
            fullWidth={true}
            margin="dense"
            name="status"
            select
            label="Select"
            variant="outlined"
            value={selectStatus}
            onChange={handleChange}
          >
            {cards.map((card) => (
              <MenuItem key={card.id} value={card.id}>
                {card.title}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" color="secondary" type="submit">
            Move All Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StatusComp;
