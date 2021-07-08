import React, { useState } from "react";
import "./App.css";
import { AppBar, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import sweetAlert from "sweetalert";
import CardContainer from "./components/CardContainer";
import CardForm from "./components/CardForm";
import NavBar from "./components/NavBar";

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
  const [title, setTitle] = useState("");
  const [cardArray, setCardArray] = useState([
    {
      id: `cardArray${Math.floor(Math.random() * 10000)}`,
      title: "todos",
      timeStamp: Date.now(),
    },
  ]);

  // *********************************(handlers)********************************************* */

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardObj = {
      id: `cardArray${Math.floor(Math.random() * 10000)}`,
      title: title,
      timeStamp: Date.now(),
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

  const handleClickAddItem = (id) => {
    let box = document.getElementById(id + "-itemContainer");
    console.log(box);
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
              title={card.title}
              key={card.id}
              id={card.id}
              cardTitle={card.title}
              onClickAddItem={() => handleClickAddItem(card.id)}
            />
          ))}
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
