const bcu = require('bigint-crypto-utils');

class RsaPublicKey{
    e;
    n;

    r;
    bitLength = 1024;

    constructor(e,n){
        this.e=e;
        this.n=n;
    }

    //calculate "r" such that  mcd(r,n) = 1, that means "n" and "r" are coprime
    async calculateR(n){
        do{
            this.r = await bcu.prime(this.bitLength);
        } while(bcu.bitLength(r) !== this.bitLength || r % n === 0n); 

        return this.r;
    }
    encrypt(m){
        console.log(m)
        return bcu.modPow(m,this.e,this.n);
    }
    verify(s){
        return bcu.modPow(s,this.e,this.n);
    }

    blind(message, r){
        //Here we have the blind message
        blindMessage = (message * Math.pow(r, this.e)) % this.n;
        return blindMessage;
    }
    unblind(blindSigned, r){
        signedMessage = (blindSigned * Math.pow(r, -1)) % this.n;
        return signedMessage;
    }
    /*
        -El verify para que sirve (Veo que retorna el modulo del numero)
    */
}
exports.RsaPublicKey = RsaPublicKey;

