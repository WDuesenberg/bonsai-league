const router = require("express").Router();
const bonsaiController = require("../../controllers/bonsaiController");

// Matches with "/api/bonsais"
router.route("/")
  .get(bonsaiController.findAll)
  .post(bonsaiController.create);

// Matches with "/api/bonsais/:id"
router
  .route("/:id")
  .get(bonsaiController.findById)
  .put(bonsaiController.update)
  .delete(bonsaiController.remove);

module.exports = router;
