const express = require("express");
const usePackRoutes = express.Router();

const {
    addPackType,
    updatePack

} = require("../controllers/packUseController");


usePackRoutes.post("/createusePack",addPackType);
usePackRoutes.put("/updateusePack/:id", updatePack);
module.exports = usePackRoutes