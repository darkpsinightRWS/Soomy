const express = require("express");
const packRoutes = express.Router();
const upload = require("../utils/multer");
const {
    addPackType,
    updatePack ,
    getPacks
} = require("../controllers/packController");


packRoutes.post("/createpack",upload.single("image"), addPackType);
packRoutes.get("/getPacks", getPacks);
packRoutes.put("/updatepack/:id", updatePack);

module.exports = packRoutes