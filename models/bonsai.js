const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bonsaiSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  owner: { 
    type: String, 
    required: true 
  },
  description: {
    type: String
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const Bonsais = mongoose.model("Bonsais", bonsaiSchema);

module.exports = Bonsais;
