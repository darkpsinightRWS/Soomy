const Pack =require("../models/pack");
const addPackType = async (req, res) => {
  try {
    console.log(req.body)
    const { num_uses, value } = JSON.parse(req.body.pack);
    if (!num_uses) {
      return res.status(400).send({ msg: "validité manquante" });
    } else if (!value) {
      return res.status(400).send({ msg: "valeur manquante" });
    }
    {
      const query = await Pack.create({
        num_uses,
        value,
      });
      return res.status(200).send(query);
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "erreur serveur" });
  }
};
  const updatePack = async (req, res) => {
    try {
      const { num_uses, value } = req.body;
      const pack = await Pack.findById(req.params.id);
      if (pack) {
        pack.num_uses = num_uses || pack.num_uses;
        pack.value = value || pack.value;
        
  
        const updatedpack = await Pack.findByIdAndUpdate(req.params.id, {
          num_uses: pack.num_uses,
          value: pack.value,
        });
        if (updatedpack) {
          res.json(updatedpack);
        } else {
          res.status(404).send({ message: "marque introuvable" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "erreur serveur" });
    }
  };
  const getPacks = async (req, res) => {
    try {
      const packs = await Pack.find();
      return res.send(packs)
    } catch (error) {
      return res.status(500).json({ message: "erreur serveur" });
    }
  };
  module.exports =  {
    addPackType,
    updatePack,
    getPacks
  };