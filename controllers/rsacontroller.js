const rsaController = {};
const myRsa = require("../rsa/generateRandomKeys");
const bigintConversion = require("bigint-conversion");

rsaController.getPulicKey = async (req, res) =>{
    rsaController.getRandomKeys = await myRsa.generateRsaKey(1024);
    console.log( rsaController.getRandomKeys);
    res.json({
        publicKey: {
        e: bigintConversion.bigintToHex( rsaController.getRandomKeys.publicKey.e),
        n: bigintConversion.bigintToHex( rsaController.getRandomKeys.publicKey.n),
        },
    });
}
rsaController.receiveEncryptedMessage = (req, res) => {
    var body = req.body;
    var encryptedMessage = bigintConversion.hexToBigint(body.encryptedMessageHex);

    console.log(encryptedMessage);
    console.log("El mensaje desencriptado es: ", rsaController.getRandomKeys.privateKey.decrypt(encryptedMessage));

    res.json({
        "message": "Encrypted message received"
    })
}


module.exports = rsaController;