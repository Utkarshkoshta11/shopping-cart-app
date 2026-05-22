const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" })); // Allow all origins temporarily
app.use(express.json());

let cart = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
];

app.get("/items", (req, res) => {
  res.json(cart);
});

app.post("/items", (req, res) => {
  const newItem = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
  };

  cart.push(newItem);

  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);

  cart = cart.map((item) => (item.id === id ? { ...item, ...req.body } : item));

  res.json(cart);
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);

  cart = cart.filter((item) => item.id !== id);

  res.json(cart);
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
