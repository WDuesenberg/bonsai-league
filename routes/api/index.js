const router = require("express").Router();
const treeRoutes = require("./bonsais");

// Book routes
router.use("/trees", treeRoutes);

module.exports = router;
