import axios from "axios";
import { useEffect, useState } from "react";
import AddItemForm from "./AddItemForm";

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  const API = process.env.REACT_APP_API_URL || "http://localhost:5001";

  const fetchItems = async () => {
    const res = await axios.get(`${API}/items`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addOrUpdate = async (data) => {
    if (selected) {
      await axios.put(`${API}/items/${selected.id}`, data);

      setSelected(null);
    } else {
      await axios.post(`${API}/items`, data);
    }

    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API}/items/${id}`);

    fetchItems();
  };

  return (
    <div>
      <AddItemForm onSubmit={addOrUpdate} selected={selected} />

      <hr />

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>{item.name}</h3>

          <p>₹{item.price}</p>

          <button onClick={() => setSelected(item)}>Edit</button>

          <button onClick={() => deleteItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;
