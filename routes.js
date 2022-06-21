const express = require("express");
const Joi = require("@hapi/joi");
const { insertItem, getItems, updateOrders } = require("./db");

const router = express.Router();

const itemSchema = Joi.object().keys({
  count: Joi.number().integer().min(0),
  orders: Joi.any(),
});

router.post("/api", (req, res) => {
  const item = req.body;
  console.log(req.body);
  const result = itemSchema.validate(item);
  if (result.error) {
    console.log(result.error);
    res.status(400).end();
    return;
  }
  insertItem(item)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

router.get("/items", (req, res) => {
  getItems()
    .then((items) => {
      items = items.map((item) => ({
        id: item._id,
        count: item.count,
        orders: item.orders,
      }));
      res.json(items);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

router.put("/item/:id/orders/:orders", (req, res) => {
  const { id, orders } = req.params;
  updateOrders(id, orders)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

router.get("/render", (req, res) => {
  getItems()
    .then((items) => {
      items = items.map((item) => ({
        id: item._id,
        count: item.count,
        orders: item.orders,
      }));
      res.render("pages/asignacion", {items});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});


module.exports = router;