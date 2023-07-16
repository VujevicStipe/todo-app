import React from "react";

function Box(props) {
  const [editToDoInput, setEditToDoInput] = React.useState(props.data.content);

  const styles = {
    opacity: props.data.isChecked ? "0.4" : "1",
  };

  function handleTextArea(e) {
    const { value } = e.target;

    setEditToDoInput(value);
  }

  return (
    <div className="box" style={styles}>
      {props.data.toEdit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.getItem(props.data.id, editToDoInput);
          }}
        >
          <textarea
            name="editItem"
            onChange={handleTextArea}
            value={editToDoInput}
          ></textarea>
          <div className="editItem">
            <button className="save">Save</button>
          </div>
        </form>
      ) : (
        <>
          <p className="text">{props.data.content}</p>
          <div className="buttons">
            <button className="delete" onClick={props.trash}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                alt=""
              />
            </button>
            <button className="edit" onClick={props.edit}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/860/860814.png"
                alt=""
              />
            </button>
            <button className="checkedBtn" onClick={props.check}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1442/1442912.png"
                alt=""
              />
            </button>
          </div>
        </>
      )}
      {/* {
        <>
          <p className="text">{props.data.content}</p>
          <div className="buttons">
            <button className="delete" onClick={props.trash}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                alt=""
              />
            </button>
            <button className="edit" onClick={props.edit}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/860/860814.png"
                alt=""
              />
            </button>
            <button className="checkedBtn" onClick={props.check}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1442/1442912.png"
                alt=""
              />
            </button>
          </div>
        </>
      } */}
    </div>
  );
}

export default Box;
