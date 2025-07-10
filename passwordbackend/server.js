const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb');

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
client.connect();
const db = client.db(dbName);
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    const collection = db.collection('documents');
    const findResults = await collection.find({}).toArray();
    console.log(findResults);
    res.send(findResults);

  res.send('Hello World!')
})
app.post("/", async (req, res) => {
    const password = req.body;
    const collection = db.collection('documents');
    const findResults = await collection.insertOne(password);
    res.send(req.body);
})
app.delete("/", async (req, res) => {
  const collection = db.collection('documents');
  const { _id } = req.body;
  await collection.deleteOne({ _id: new ObjectId(_id) });
  res.send("Deleted");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
