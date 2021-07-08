import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f7f7f7",
    margin: "10px",
    height: "430px",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#3f51b5",
    textAlign: "left",
    textTransform: "capitalize",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    marginBottom: "3px",
    padding: theme.spacing(1),
  },
  btnWrapper: {
    backgroundColor: "#3f51b5",
  },
  btnAddItem: {
    margin: theme.spacing(1),
    backgroundColor: "#fff",
  },
  itemContainer: {
    maxHeight: "330px",
    height: "330px",
    overflow: "auto",
    padding: "5px 20px",
  },
}));

const CardContainer = (props) => {
  const classes = useStyles();
  const { title, id, onClickAddItem, cardTitle } = props;
  return (
    <Box boxShadow={2} width={400} className={classes.root} id={id}>
      <Paper className={classes.title}>
        <Typography variant="h5">{title}</Typography>
      </Paper>
      <div className={classes.btnWrapper}>
        <Button
          className={classes.btnAddItem}
          size="small"
          variant="outlined"
          onClick={onClickAddItem}
        >
          Add Item
        </Button>
      </div>
      <Box
        className={classes.itemContainer}
        boxShadow={2}
        width={400}
        id={id + "-itemContainer"}
      >
        <h2>{cardTitle}</h2>
      </Box>
    </Box>
  );
};

export default CardContainer;
