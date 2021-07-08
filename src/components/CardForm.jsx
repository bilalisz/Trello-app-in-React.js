import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  btnAddCard: {
    margin: theme.spacing(1),
    width: "25ch",
    marginTop: theme.spacing(2),
  },
}));

const CardForm = (props) => {
  const classes = useStyles();
  const { onChange, onSubmit, value } = props;
  return (
    <form onSubmit={onSubmit} autoComplete="on" className="d-flex-center">
      <div>
        <TextField
          onChange={onChange}
          className={classes.root}
          id="outlined-basic"
          margin="dense"
          size="medium"
          label="T i t l e"
          variant="outlined"
          value={value}
        />
        <Button
          className={classes.btnAddCard}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Card
        </Button>
      </div>
    </form>
  );
};

export default CardForm;
