const { Router } = require("express");
const router = Router();
const rsaController = require ("../controllers/rsacontroller")

//GET
router.get("/", (req, res) => {
  res.json({
    Title: "Hola mundo",
  });
});

router.get("/publickey", rsaController.getPulicKey);
router.put(("/sendmessage"), rsaController.receiveEncryptedMessage)

module.exports = router;
