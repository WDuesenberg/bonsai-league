const router = require("express").Router();
const treeRoutes = require("./bonsais");

// Book routes
router.use("/bonsais", treeRoutes);

module.exports = router;
