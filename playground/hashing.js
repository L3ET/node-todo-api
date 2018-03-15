const {SHA256,AES} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, 'aaa2212');
console.log(token);

var decoded = jwt.verify(token, 'aaa2212');
console.log(decoded);

// var message = "I am user number 3";
// var key = "abc abc"
// var hash = SHA256(message);
// var hashAes = AES.encrypt(message, key);
// var hashAesDec = AES.decrypt(hashAes, key).toString(CryptoJS.enc.Utf8);


// console.log(`message: ${message}`);
// console.log(SHA256(hash).toString());
// console.log(`Hash: ${hash}`);
// console.log(`HashAes: ${hashAes}`);
// console.log(`HashAesDec: ${hashAesDec}`);