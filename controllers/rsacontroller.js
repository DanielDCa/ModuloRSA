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
rsaController.decryptMessage = (req, res) => {
    var body = req.body;
    var encryptedMessage = bigintConversion.hexToBigint(body.encryptedMessageHex);

    console.log(encryptedMessage);
    console.log("El mensaje desencriptado es: ", rsaController.getRandomKeys.privateKey.decrypt(encryptedMessage));

    res.json({
        "message": `El mensaje desencriptado es ${ rsaController.getRandomKeys.privateKey.decrypt(encryptedMessage)}`
    })
}

rsaController.signMessage = (req, res) => {
    var body = req.body;
    var message = bigintConversion.hexToBigint(body.messageHex);
    var signedMessage = rsaController.getRandomKeys.privateKey.sign(message);
    //console.log(signedMessage);

    res.json({
        signedMessage: bigintConversion.bigintToHex(signedMessage),
    });

}

module.exports = rsaController;

