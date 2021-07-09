import React, { useState, useEffect } from "react";
import "./App.css";
import { AppBar, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import sweetAlert from "sweetalert";
import CardContainer from "./components/CardContainer";
import CardForm from "./components/CardForm";
import NavBar from "./components/NavBar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
    padding: "10px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function App() {
  const classes = useStyles();
  const [currentCardId, setCurrentCardId] = useState("");
  const [title, setTitle] = useState("");
  const [addtItemModal, setAddItemModal] = useState(false);
  const [assignName, setAssignName] = useState();
  const [cardArray, setCardArray] = useState([
    {
      id: `cardArray${Math.floor(Math.random() * 10000)}`,
      title: "todos",
      timeStamp: Date.now(),
      tasks: [
        {
          id: `itemArray${Math.floor(Math.random() * 20000)}`,
          title: "Title 1",
          description: "description",
          assign: "item.assign",
          timeStam: Date.now(),
        },
      ],
    },
  ]);

  // *********************************(use Effects hooks)********************************************* */
  useEffect(() => {
    axios
      .get("https://mocki.io/v1/0b876615-7741-46b7-bf9b-80b00a07272b")
      .then((data) => {
        console.log(data.data);
        setAssignName(data.data);
      });
  }, [setAssignName]);

  const getItemObj = (item) => {
    debugger;
    console.log("new item add", item);
    const itemObj = {
      id: `itemArray${Math.floor(Math.random() * 20000)}`,
      title: item.title,
      description: item.description,
      assign: item.assign,
      timeStam: Date.now(),
    };
    setCardArray(
      cardArray.map((card) =>
        card.id === currentCardId
          ? { ...card, tasks: [...card.tasks, itemObj] }
          : card
      )
    );

    setCurrentCardId("");
  };

  // *********************************(handlers)********************************************* */

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    const cardObj = {
      id: `cardArray${Math.floor(Math.random() * 10000)}`,
      title: title,
      timeStamp: Date.now(),
      tasks: [],
    };
    if (!title) {
      sweetAlert({
        title: "Error",
        text: "Places Enter Card Title !",
        icon: "error",
      });
    } else {
      cardArray.length === 3
        ? sweetAlert("no more card")
        : setCardArray((old) => [...old, cardObj]);
      setTitle("");
    }
  };

  // *******************************(add item modal handlers)********************************* */
  const handleAddItemModalOpen = (id) => {
    setCurrentCardId(id);
    setAddItemModal(true);
  };

  // *******************************(add item modal handlers)********************************* */

  const handleDeleteCard = (id) => {
    console.log(id);
    sweetAlert({
      title: "Are you sure?",
      text: "Delete card will remove from DOM ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const filterdCard = cardArray.filter((card) => card.id !== id);
        setCardArray(filterdCard);
      } else {
        sweetAlert("card is not deleted!");
      }
    });
  };

  // ******************************(return jsx/html)******************************************************* */
  return (
    <React.Fragment>
      <AppBar position="relative">
        <NavBar />
      </AppBar>
      <CardForm
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onSubmit={handleSubmit}
        value={title}
      />
      <div className={classes.root}>
        <Container className={classes.container}>
          {cardArray.map((card) => (
            <CardContainer
              card={card}
              key={card.id}
              onDeleteCard={handleDeleteCard}
              addItemModal={addtItemModal}
              onAddItemModalOpen={handleAddItemModalOpen}
              onAddItemModalClose={() => setAddItemModal(false)}
              modalOpen={addtItemModal}
              assignName={assignName}
              getItemObj={getItemObj}
            />
          ))}
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
