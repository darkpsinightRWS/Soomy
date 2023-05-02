const express = require("express");
const purchaseRoutes = express.Router();

const {
    addPackType,
  updatePack
} = require("../controllers/packController");


purchaseRoutes.post("/createpurchase", addPackType);
purchaseRoutes.put("/updatepurchase/:id", updatePack);
module.exports = purchaseRoutes