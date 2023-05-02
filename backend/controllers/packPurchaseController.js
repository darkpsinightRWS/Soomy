const PackPurchase = require("../models/packPurchase");
const addPackType = async (req, res) => {
  try {
    const { pack_id, user_id, transaction_id } = req.body;
    if (!pack_id) {
      return res.status(400).send({ msg: "validité manquante" });
    } else if (!user_id) {
      return res.status(400).send({ msg: "valeur manquante" });
    } else if (!transaction_id) {
      return res.status(400).send({ msg: "valeur manquante" });
    }
    {
      const query = await PackPurchase.create({
        pack_id,
        user_id,
        transaction_id,
      });
      return res.status(200).send(query);
    }
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const updatePack = async (req, res) => {
  try {
    const { pack_id,
      user_id,
      transaction_id } = req.body;
    const purchase = await PackPurchase.findById(req.params.id);
    if (purchase) {
      purchase.pack_id = pack_id || purchase.pack_id;
      purchase.user_id = user_id || purchase.user_id;
      purchase.transaction_id = transaction_id || purchase.transaction_id;

      const updatedpurchase = await PackPurchase.findByIdAndUpdate(req.params.id, {
        pack_id: purchase.pack_id,
        user_id: purchase.user_id,
        transaction_id: purchase.transaction_id,
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