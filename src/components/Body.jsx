import { React, useState, useEffect } from "react";

export default function Body() {
  const [listItems, setListItems] = useState([]);
  const [listItem, setListItem] = useState("");

  useEffect(() => {
    const storedListItems = JSON.parse(localStorage.getItem("listItems"));
    if (storedListItems && storedListItems.length > 0) { // Check if array is not empty
      setListItems(storedListItems);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setListItems([...listItems, listItem]);
    setListItem("");
  };

  const handleDelete = (e) => {
    const remainingItems = listItems.filter((item) => item !== e.target.value);
    setListItems(remainingItems);
  };

  return (
    <div className="main-content">
      <div className="list-items">
        {listItems.map((item) => (
          <p className="list-item" key={item}>
            {item}{" "}
            <button value={item} onClick={handleDelete}>
              -
            </button>
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
        ></input>
        <button type="submit">+</button>
      </form>
    </div>
  );
}