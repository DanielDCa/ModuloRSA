const bcu = require('bigint-crypto-utils');
class RsaPrivateKey{
    d;
    n;

    constructor(d,n){
        this.d =d;
        this.n =n;
    }

    decrypt(c){
        return bcu.modPow(c,this.d,this.n);
    }
    sign(m){
        return bcu.modPow(m,this.d,this.n)
    }
}

exports.RsaPrivateKey = RsaPrivateKey;


/*
e = 65537n
phin=(p-1n)(q-1n)

while(  ||phin%e == 0) Cuando sea diferente a 0 son coprimos
luego bcu.modInv(e,phin) (esto deberia ser el valor de d)

juanelas -- github paillier.bigint GenerateRamdon
const privkey = new RsaPrivatreKey(d,n)
m=271
s = privKey.sign(m)


function generateRsaKey(bitlength:int){

    return{
        pubKey
        rpivKey
    }
}
*/