import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header.jsx";
import "./App.css";
import Form from "../Form/Form.jsx";
import Buttons from "../Buttons/Buttons.jsx";

import ShoppingList from "../ShoppingList/ShoppingList.jsx";

function App() {
  const [itemList, setItemList] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("");

  // const [newItem, setNewItem] = useState({ name: "", quantity: 0, unit: "" });

  useEffect(() => {
    // Fetch items from the server here
    getItems();
  }, []);

  const getItems = () => {
    axios
      .get("/items")
      .then((response) => {
        setItemList(response.data);
      })
      .catch((err) => {
        alert("Error getting items");
        console.log(err);
      });
  };

  const addItem = () => {
    axios
      .post("/items", {
        name: newItemName,
        quantity: newItemQuantity,
        unit: newItemUnit,
      })
      .then((response) => {
        console.log("in axios post", response);
        // Clear inputs
        setNewItemName("");
        setNewItemQuantity("");
        setNewItemUnit("");

        getItems();
      })
      .catch((err) => {
        alert("Error Adding Item");
        console.log(err);
      });
  };

  const markAsPurchased = (id) => {
    axios
      .put(`/items/${id}`)
      .then((response) => {
        getItems(); // Refresh the list after updating
      })
      .catch((err) => {
        alert("Error Marking Item as Purchased");
        console.log(err);
      });
  };

  const deleteItem = (id) => {
    axios
      .delete(`/items/${id}`)
      .then((response) => {
        // Refresh the student list
        getItems();
      })
      .catch((err) => {
        alert("Error deleting items");
        console.log(err);
      });
  };

  const clearTable = () => {
    axios
      .delete(`/items/`)
      .then((response) => {
        getItems()
      })
      .catch((err) => {
        console.log('Error in clearing table', err);
      })
  }

  const resetItems = () => {
    axios
      .put(`/items/`)
      .then((response) => {
        getItems(); // Refresh the list after updating
      })
      .catch((err) => {
        alert("Error Marking Item as Purchased");
        console.log(err);
      });
  };

}
// completedkey ? display something : do nothing

return (
  <div className="App">
    <Header />
    <Form
      setNewItemName={setNewItemName}
      setNewItemQuantity={setNewItemQuantity}
      setNewItemUnit={setNewItemUnit}
      newItemName={newItemName}
      newItemQuantity={newItemQuantity}
      newItemUnit={newItemUnit}
      // handleSubmit={handleSubmit}
      addItem={addItem}
    />
    <main>
      <ShoppingList
        items={itemList}
        markAsPurchased={markAsPurchased}
        deleteItem={deleteItem}
        clearTable={clearTable}
        resetItems={resetItems}
      />
      <Buttons Buttons={Buttons} />
    </main>
  </div>
);


export default App;
