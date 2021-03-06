const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bonsaiSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  location: {
    type: String,
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,    
  } 
});

const Bonsais = mongoose.model("Bonsais", bonsaiSchema);

module.exports = Bonsais;
