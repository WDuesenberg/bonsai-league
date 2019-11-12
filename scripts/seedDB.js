const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/bonsai-league"
);

const bonsaiSeed = [
  {
    name: ,
    species: ,
    owner "Stephen King",
    description:
    date: new Date(Date.now())
  },
    
];

db.Bonsai
  .remove({})
  .then(() => db.Bonsai.collection.insertMany(bonsaiSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
