const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'PassOP';

let collection;

// Connect to MongoDB 
async function startServer() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(dbName);
    collection = db.collection('passwords');

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

// ------------------------
// Routes
// ------------------------

// GET all passwords
app.get('/', async (req, res) => {
  try {
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
});

// POST new password
app.post('/', async (req, res) => {
  try {
    const password = req.body;
    const result = await collection.insertOne(password);
    res.send({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add password' });
  }
});

// DELETE password by custom id
app.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const result = await collection.deleteOne({ id });
    res.send({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete password' });
  }
});

// PATCH (edit) password by custom id
app.patch('/', async (req, res) => {
  const { id, ...updatedData } = req.body;

  try {
    const result = await collection.updateOne(
      { id },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to update password" });
  }
});

// Start the server after DB connects
startServer();
