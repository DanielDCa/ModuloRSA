const { Router } = require("express");
const router = Router();
const myRsa = require("../rsa/generateRandomKeys");
const bigintConversion = require("bigint-conversion");

//GET
router.get("/", (req, res) => {
  res.json({
    Title: "Hola mundo",
  });
});

router.get("/publickey", async (req, res) => {
  let randomKeys = await myRsa.generateRsaKey(1024);
  console.log(randomKeys);
  res.json({
    publicKey: {
      e: bigintConversion.bigintToHex(randomKeys.publicKey.e),
      n: bigintConversion.bigintToHex(randomKeys.publicKey.n),
    },
  });
});

module.exports = router;
