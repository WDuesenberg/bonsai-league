import axios from "axios";

export default {
  // Gets all bonsai
  getBonsais: function() {
    return axios.get("/api/bonsais");
  },
  // Gets the bonsai with the given id
  getBonsai: function(id) {
    if (id) {
      return axios.get("/api/bonsais/" + id);
    } else {
      return "No Trees Available"
    }
  },

  // Deletes the bonsai with the given id
  deleteBonsai: function(id) {
    if (id) {
      return axios.delete("/api/bonsais/" + id);
    } else {
      return "Nothing to Delete"
    }
  },

  // Saves a bonsai to the database
  saveBonsai: function(bonsaiData) {
    return axios.post("/api/bonsais", bonsaiData);
  }
};
