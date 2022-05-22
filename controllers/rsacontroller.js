const rsaController = {};
const myPailler = require('../rsa/generateRandomPaillerKeys');
const myRsa = require("../rsa/generateRandomKeys");
const bigintConversion = require("bigint-conversion");
const {PaillerPublicKey} = require ('../rsa/paillerPublicKey')
const {PaillerPrivateKey} = require ('../rsa/paillerPrivateKey')

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

rsaController.paillerget = async (req, res) => {


    keyRSA = await myRsa.generateRsaKey(2048);
   
        const { publicKey, privateKey } = await myPailler.generateRandomPaillerKeys(3072)
        var PaillerPublicKey = publicKey 
        const iniciarVoto = 0n;
        votos = PaillerPublicKey.encrypt(iniciarVoto);
        
    

      res.json({
        eHex: bigintConversion.bigintToHex(keyRSA.publicKey.e),
        nHex: bigintConversion.bigintToHex(keyRSA.publicKey.n),
        nPaillierHex: bigintConversion.bigintToHex(PaillerPublicKey.n),
        gPaillierHex: bigintConversion.bigintToHex(PaillerPublicKey.g)
      })
    
}



module.exports = rsaController;

