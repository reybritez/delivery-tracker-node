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

// router.get("/items", (req, res) => {
//   getItems()
//     .then((items) => {
//       items = items.map((item) => ({
//         id: item._id,
//         count: item.count,
//         orders: item.orders,
//       }));
//       res.json(items);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).end();
//     });
// });

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

router.get("/haversine", (req, res) => {
  listita = [[-25.28340819899043, -57.64492282013374],[-25.282859968885006, -57.64261207183948],[-25.279668922403566, -57.63834329362099]] ;  
  getItems()
    .then((lista) => {
      function logArrayElements(element, index, listita) {
        for(var i = 0; i < lista ; ++i) {
          return lista[i];}
      listita.forEach(logArrayElements);}
      res.render("pages/haversine",{listita});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
module.exports = router;