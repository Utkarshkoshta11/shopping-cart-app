import { useState, useEffect } from "react";

function AddItemForm({ onSubmit, selected }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setPrice(selected.price);
    }
  }, [selected]);

  return (
    <div>
      <input
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button
        onClick={() => {
          onSubmit({
            name,
            price: Number(price),
          });

          setName("");
          setPrice("");
        }}
      >
        {selected ? "Update" : "Add Item"}
      </button>
    </div>
  );
}

export default AddItemForm;
