const PackUse = require("../models/packUse");
const addPackType = async (req, res) => {
  try {
    const { room_id, purchase_id, remaining } = req.body;
    if (!room_id) {
      return res.status(400).send({ msg: "validité manquante" });
    } else if (!purchase_id) {
      return res.status(400).send({ msg: "valeur manquante" });
    } else if (!remaining) {
      return res.status(400).send({ msg: "valeur manquante" });
    } 
    {
      const query = await PackUse.create({
        room_id,
        purchase_id,
        remaining,
      });
      return res.status(200).send(query);
    }
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const updatePack = async (req, res) => {
  try {
    const { room_id, purchase_id, remaining } = req.body;
    const purchase = await PackUse.findById(req.params.id);
    if (purchase) {
      purchase.room_id = room_id || purchase.room_id;
      purchase.purchase_id = purchase_id || purchase.purchase_id;
      purchase.remaining = remaining || purchase.remaining;

      const updatedpurchase = await PackUse.findByIdAndUpdate(req.params.id, {
        room_id: purchase.room_id,
        purchase_id: purchase.purchase_id,
        remaining: purchase.remaining,
      });
      if (updatedpurchase) {
        res.json(updatedpurchase);
      } else {
        res.status(404).send({ message: "pack introuvable" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
module.exports =  {
  addPackType,
  updatePack,
};
