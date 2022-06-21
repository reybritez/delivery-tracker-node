const { MongoClient, ObjectId } = require("mongodb");

const connectionUrl = "mongodb://localhost:27017";
const dbName = "delivery-tracker";

let db;

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then(
    (client) => {
      db = client.db(dbName);
    }
  );

const insertItem = (item) => {
  const collection = db.collection("deliverytrackerpy");
  return collection.insertOne(item);
};

const getItems = () => {
  const collection = db.collection("deliverytrackerpy");
  return collection.find({}).toArray();
};

const updateOrders = (id, orders) => {
  const collection = db.collection("deliverytrackerpy");
  return collection.updateOne({ _id: ObjectId(id) }, { $inc: { orders } });
};

module.exports = { init, insertItem, getItems, updateOrders };
