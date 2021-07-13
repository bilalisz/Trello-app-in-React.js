import React, { useState, useEffect } from "react";
import "./App.css";
import { AppBar, Container, MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import sweetAlert from "sweetalert";
import CardContainer from "./components/CardContainer";
import CardForm from "./components/CardForm";
import NavBar from "./components/NavBar";
import axios from "axios";
import StatusComp from "./components/control/StatusComp";
import UpdateModal from "./components/control/UpdateModal";
import { getAssing } from "./services/actions/actions";

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
  const [statusModal, setStatusModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [selectStatus, setSelectStatus] = useState("");
  const [updateItem, setUpdateItem] = useState({});
  const [updateCard, setUpdateCard] = useState({});

  const [assignName, setAssignName] = useState([]);
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
          assign: "Aassign",
          timeStam: Date.now(),
        },
      ],
    },
  ]);

  // *********************************(use Effects hooks)********************************************* */
  useEffect(() => {
    axios
      .get("https://mocki.io/v1/0b876615-7741-46b7-bf9b-80b00a07272b")
      .then((data) => setAssignName(data.data));
    // const assignData = getAssing(
    //   "https://mocki.io/v1/0b876615-7741-46b7-bf9b-80b00a07272b"
    // );
    // console.log("assign data", assignData);
  }, [setAssignName]);

  const getItemObj = (item) => {
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

  const handleDeleteCard = (id) => {
    console.log(id);
    const card = cardArray.find((card) => card.id === id);
    sweetAlert({
      title: "Are you sure?",
      text: "Do you want to delete" + " " + card.title + " " + "tasks",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const filterdCard = cardArray.filter((card) => card.id !== id);
        console.log(filterdCard);
        setCardArray(filterdCard);
      }
    });
  };

  const handleMoveAll = (e) => {
    e.preventDefault();
    setStatusModal(false);
    // debugger;
    const filterCurrentCard = cardArray.find(
      (card) => card.id === currentCardId
    );
    console.log("filter tasks", filterCurrentCard.tasks);

    console.log(cardArray);
    let toArray = cardArray.map((card) => {
      if (card.id === selectStatus) {
        return { ...card, tasks: [...card.tasks, ...filterCurrentCard.tasks] };
      } else {
        return card;
      }
    });
    let fromCard = toArray.map((card) => {
      if (card.id === currentCardId) {
        return { ...card, tasks: (card.tasks.length = 0) };
      } else {
        return card;
      }
    });
    cardArray.map((card) => {
      if (card.id === currentCardId) {
        if (currentCardId === selectStatus) {
          sweetAlert({
            icon: "error",
            title: "Error",
            text: "Task Box is Empty",
          });

          return setCardArray(cardArray.map((card) => card));
        }
      } else {
        setCardArray(fromCard);
        setCardArray(toArray);
        setSelectStatus("");
        setCurrentCardId("");
      }
    });

    // setCardArray(fromCard);
    // setCardArray(toArray);
    // setSelectStatus("");
    // setCurrentCardId("");
  };

  const handleSortByName = (id) => {
    console.log(id);
    const cardContainer = cardArray.find((card) => card.id === id);
    console.log("card is", cardContainer);
    if (!cardContainer.tasks.length) {
      sweetAlert({
        icon: "error",
        title: "Error",
        text: "Task Box is Empty",
      });
    } else {
      const sortTasks = cardContainer.tasks.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
      console.log("sort tasks", sortTasks);
      if (sortTasks.length) {
        setCardArray(
          cardArray.map((card) =>
            card.id === id ? { ...card, tasks: [...sortTasks] } : card
          )
        );
      }
    }
  };
  const handleRandomSort = (id) => {
    // debugger;
    console.log(id);
    const cardContainer = cardArray.find((card) => card.id === id);
    console.log("card is", cardContainer);
    if (!cardContainer.tasks.length) {
      sweetAlert({
        icon: "error",
        title: "Error",
        text: "Task Box is Empty",
      });
    } else {
      const sortTasks = cardContainer.tasks.sort(() => Math.random() - 0.5);
      console.log("sort tasks", sortTasks);
      if (sortTasks.length) {
        setCardArray(
          cardArray.map((card) =>
            card.id === id ? { ...card, tasks: [...sortTasks] } : card
          )
        );
      }
    }
  };

  // *******************************( modal handlers)********************************* */
  const handleAddItemModalOpen = (id) => {
    setCurrentCardId(id);
    setAddItemModal(true);
  };

  const handleOpenStatusModal = (cardId) => {
    console.log("status modal open", cardId);
    const card = cardArray.find((card) => card.id === cardId);
    if (card.tasks.length) setStatusModal(true);
    else {
      sweetAlert({
        icon: "error",
        title: "Error",
        text: "Task Box is Empty",
      });
    }
  };

  const handleCloseStatusModal = () => {
    console.log("status modal is close");
    setStatusModal(false);
    console.log(selectStatus);
  };

  const getStatus = (selectValue) => {
    setSelectStatus(selectValue);
  };
  const handleGetCurrentCard = (currentCard) => {
    setCurrentCardId(currentCard);
  };

  const handleOpenUpdateModal = (itemId, cardId) => {
    setOpenUpdateModal(true);
    const filteredCard = cardArray.find((card) => {
      return card.id === cardId;
    });
    const filteredItem = filteredCard.tasks.find((task) => task.id === itemId);
    console.log(filteredItem);
    setUpdateCard(filteredCard);
    setUpdateItem(filteredItem);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const getUpdateItem = (updateTask, updateStatus, taskId) => {
    // debugger;
    const currentCardId = updateCard.id;
    const { title, description, assign } = updateTask;
    const currentCard = cardArray.find((card) => card.id === currentCardId);
    const item = currentCard.tasks.find((task) => task.id === taskId);

    const updateItem = {
      ...item,
      title: title,
      description: description,
      assign: assign,
    };

    let updateContent = cardArray.map((card) => {
      if (card.id === currentCardId) {
        return {
          ...card,
          tasks: card.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  title: updateTask.title,
                  description: updateTask.description,
                  assign: updateTask.assign,
                }
              : task
          ),
        };
      } else {
        return card;
      }
    });

    let moveAndUpdateTask = cardArray.map((card) => {
      if (card.id === currentCardId) {
        return {
          ...card,
          tasks: card.tasks.filter((task) => task.id !== taskId),
        };
      } else if (card.id === updateStatus) {
        return { ...card, tasks: [...card.tasks, updateItem] };
      } else {
        return card;
      }
    });
    if (currentCardId === updateStatus) {
      setCardArray(updateContent);
    } else {
      setCardArray(moveAndUpdateTask);
    }

    setCurrentCardId("");
  };

  // *******************************( modal handlers)********************************* */

  // ******************************(item click handlers)******************************************************* */

  const handleDeleteItem = (itemId, cardId) => {
    const card = cardArray.filter((card) => card.id === cardId);
    const tasks = card[0].tasks.filter((task) => task.id !== itemId);

    console.log(card[0].tasks);
    console.log(tasks);
    const deleteItem = cardArray.map((card) =>
      card.id === cardId ? { ...card, tasks: [...tasks] } : card
    );
    sweetAlert({
      title: "Delete Item",
      text: "Do you want to delete this item ?  ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setCardArray(deleteItem);
      } else {
        sweetAlert("item is not deleted!");
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
              modalOpen={addtItemModal}
              getItemObj={getItemObj}
              assignName={assignName}
              addItemModal={addtItemModal}
              getCurrentCard={handleGetCurrentCard}
              onAddItemModalOpen={handleAddItemModalOpen}
              onAddItemModalClose={() => setAddItemModal(false)}
              onDeleteCard={handleDeleteCard}
              onOpenStatusModal={handleOpenStatusModal}
              onSortByName={handleSortByName}
              onRandomSort={handleRandomSort}
              onDeleteItem={handleDeleteItem}
              onUpdateModalOpen={handleOpenUpdateModal}
              // update props
              onCloseUpdateModal={handleCloseUpdateModal}
              openUpdateModal={openUpdateModal}
              task={updateItem}
              getUpdateItem={getUpdateItem}
              cards={cardArray}
            />
          ))}
        </Container>
      </div>
      <StatusComp
        open={statusModal}
        onCloseModal={handleCloseStatusModal}
        cards={cardArray}
        getStatus={getStatus}
        selectStatus={selectStatus}
        onMoveall={handleMoveAll}
      />
    </React.Fragment>
  );
}

export default App;
