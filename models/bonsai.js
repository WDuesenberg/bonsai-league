const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bonsaiSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Bonsais = mongoose.model("Bonsais", bonsaiSchema);

module.exports = Bonsais;
