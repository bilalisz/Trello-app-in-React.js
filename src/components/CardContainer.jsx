import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Paper,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CardMenu from "./control/CardMenu";
import AddItemModal from "./control/AddItemModal";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f7f7f7",
    margin: "10px",
    height: "450px",
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
    display: "flex",
    justifyContent: "space-between",
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
    backgroundColor: "#9b999c",
  },
  itemRoot: {
    margin: theme.spacing(1),
    backgroundColor: "#dfdfe0",
    position: "relative",
  },
  itemIconsWrapper: {
    position: "absolute",
    top: "1%",
    right: "1%",
    opacity: 0,
    cursor: "pointer",
    width: "50px",

    "&:hover": {
      opacity: 1,
    },
  },
  itemTitle: {
    color: "#3f51b5",
  },
}));

const CardContainer = (props) => {
  const classes = useStyles();
  const {
    modalOpen,
    card,
    onDeleteCard,
    onAddItemModalOpen,
    onAddItemModalClose,
    getItemObj,
    assignName,
    onOpenStatusModal,
    getCurrentCard,
    onSortByName,
    onRandomSort,
    onDeleteItem,
    onUpdateModalOpen,
  } = props;

  return (
    <Box
      boxShadow={2}
      width={400}
      position="relative"
      className={classes.root}
      id={card.id}
    >
      <Paper className={classes.title}>
        <Typography variant="h5">{card.title}</Typography>
        <CardMenu
          card={card}
          onDeleteCard={onDeleteCard}
          onOpenStatusModal={onOpenStatusModal}
          getCurrentCard={getCurrentCard}
          onSortByName={onSortByName}
          onRandomSort={onRandomSort}
        />
      </Paper>
      <div className={classes.btnWrapper}>
        <Button
          className={classes.btnAddItem}
          size="small"
          variant="outlined"
          onClick={() => onAddItemModalOpen(card.id)}
        >
          Add Item
        </Button>
      </div>
      <Box
        className={classes.itemContainer}
        boxShadow={2}
        width={400}
        id={card.id + "-itemContainer"}
      >
        {card.tasks.map((task) => (
          <Card key={task.id} className={classes.itemRoot}>
            <CardContent>
              <Typography className={classes.itemTitle} variant="h5">
                {task.title}
              </Typography>
              <Typography color="textSecondary" component="h2">
                {task.description}
              </Typography>
              <h4>{task.assign}</h4>
            </CardContent>
            <span className={classes.itemIconsWrapper}>
              <DeleteIcon
                color="secondary"
                onClick={() => onDeleteItem(task.id, card.id)}
              />
              <EditIcon
                color="primary"
                onClick={() => onUpdateModalOpen(task.id, card.id)}
              />
            </span>
          </Card>
        ))}
      </Box>
      <AddItemModal
        onAddItemModalClose={onAddItemModalClose}
        modalOpen={modalOpen}
        getItem={getItemObj}
        assignName={assignName}
        cardId={card.id}
      />
    </Box>
  );
};

export default CardContainer;
