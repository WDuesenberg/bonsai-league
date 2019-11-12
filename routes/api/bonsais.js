const router = require("express").Router();
const treesController = require("../../controllers/bonsaiController");

// Matches with "/api/bonsais"
router.route("/")
  .get(treesController.findAll)
  .post(treesController.create);

// Matches with "/api/bonsais/:id"
router
  .route("/:id")
  .get(treesController.findById)
  .put(treesController.update)
  .delete(treesController.remove);

module.exports = router;
