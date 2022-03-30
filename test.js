// console.log("12mod5 = " + (12 % 5));
const bcu = require('bigint-crypto-utils');
const myRsa = require("./rsa/generateRandomKeys");
const { RsaPublicKey } = require("./rsa/rsaPublicKey");

// const publiKey = new RsaPublicKey(2,3);
// publiKey.encrypt(BigInt(8));

//myRsa.generateRsaKey(4);


console.log("----------------");

const bitLength = 1024;

main();
async function main(){ 
    
    const bitLength = 1024;
    const keyPair = await myRsa.generateRsaKey(bitLength);
    
    const m = bcu.randBetween(keyPair.publicKey.n - 1n); //Genera un mensaje aleatorio -- Con el modulo - 1

    const c = keyPair.publicKey.encrypt(m)

    const d = keyPair.privateKey.decrypt(c)

    if(m !== d){
        console.log("Error");
    }
    else{
        console.log("Working");
    }

}


//Segado y desegado en la firma a ciega