import React from "react";
import "./App.css";
import Box from "./components/Box";
import { nanoid } from "nanoid";

function App() {
  const [toDoInput, setToDoInput] = React.useState(returnNewToDo);
  const [toDoList, setToDoList] = React.useState(getLocalStorage);

  React.useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  function getLocalStorage() {
    return JSON.parse(localStorage.getItem("toDoList"));
  }

  function returnNewToDo() {
    return {
      id: nanoid(),
      content: "",
      isChecked: false,
      toEdit: false,
    };
  }

  function handleInput(e) {
    const { name, value, type, checked } = e.target;

    setToDoInput((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function addToDo(e) {
    e.preventDefault();
    setToDoList((prevData) => [...prevData, toDoInput]);

    setToDoInput(returnNewToDo);
  }

  function trash(element) {
    const items = toDoList.filter((item) => {
      return element !== item.id;
    });

    setToDoList(items);
  }

  function editIt(element) {
    const items = toDoList.map((item) => {
      return element === item.id ? { ...item, toEdit: !item.toEdit } : item;
    });

    setToDoList(items);
  }

  function checkItem(element) {
    const items = toDoList.map((item) => {
      return element === item.id
        ? { ...item, isChecked: !item.isChecked }
        : item;
    });

    setToDoList(items);
  }

  function getElement(elementId, element) {
    const items = toDoList.map((item) => {
      return elementId === item.id
        ? {
            ...item,
            toEdit: false,
            content: element,
          }
        : item;
    });

    setToDoList(items);
  }

  return (
    <div className="container">
      <form className="form" onSubmit={addToDo}>
        <input
          type="text"
          placeholder="Napiši popis što za učiniti"
          className="inputToDo"
          name="content"
          onChange={handleInput}
          value={toDoInput.content}
        />
        <button className="submit">Submit</button>
      </form>
      <div className="results">
        {toDoList !== 0 &&
          toDoList.map((item, index) => {
            return (
              <Box
                key={index}
                data={item}
                trash={() => trash(item.id)}
                edit={() => editIt(item.id)}
                check={() => checkItem(item.id)}
                getItem={getElement}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
