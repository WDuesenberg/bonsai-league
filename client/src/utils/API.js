import axios from "axios";

export default {
  // Gets all bonsai
  getBonsais: function() {
    return axios.get("/api/bonsais");
  },
  // Gets the bonsai with the given id
  getBonsai: function(id) {
    return axios.get("/api/bonsais/" + id);
  },
  // Deletes the bonsai with the given id
  deleteBonsai: function(id) {
    return axios.delete("/api/bonsais/" + id);
  },
  // Saves a bonsai to the database
  saveBonsai: function(bonsaiData) {
    return axios.post("/api/bonsais", bonsaiData);
  }
};
