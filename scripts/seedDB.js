const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Bonsai collection and inserts the bonsais below


const bonsaiSeed = [
  {
    name: "My First Bonsai",
    owner: "John Smith",
    species: "Juniper (Juniperus)",
    location: "Denver, CO",
    description:"This is my first bonsai tree. It's still just a baby put with proper care and nurturing, I hope to help it grow into a beautiful, healthy and happy bonsai.",
    imageUrl: "trident-3.jpg",
    date: new Date(Date.now())
  },
    
];

module.exports=() => {

  db.Bonsai
  .remove({})
  .then(() => db.Bonsai.collection.insertMany(bonsaiSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    // process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}
