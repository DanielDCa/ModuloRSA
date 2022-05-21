const { Router } = require("express");
const router = Router();
const rsaController = require ("../controllers/rsacontroller")

//GET
router.get("/", (req, res) => {
  res.json({
    Title: "Hola mundo",
  });
});
//GET PUBLIC KEY
router.get("/publickey", rsaController.getPulicKey);

//POST receive the message from client
router.post(("/decrypt"), rsaController.decryptMessage);

//POST receive the message from clien and sign it
router.post(("/sign"), rsaController.signMessage);

//router.post(("/signBlind"), rsaController.signMessage);

module.exports = router;
