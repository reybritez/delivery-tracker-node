const { MongoClient, ObjectId , ServerApiVersion} = require("mongodb");

const connectionUrl = "mongodb+srv://st3v3nk1ng:7ent2NkfJX7uvWuq@delivery-tracker.46lxb.mongodb.net/?retryWrites=true&w=majority";
const dbName = "delivery-tracker";

let db;

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1}).then(
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
