const {SHA256,AES} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "123abc!";
bcrypt.genSalt(13,(err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=> {
        console.log(hash);
    })
});

var hashedPassword = "$2a$13$k7xHq9zOSKB5WFOytkfNeensDfPMPjsE.Xr97b7cLAZ2HAYQyOuWC";
bcrypt.compare(password, hashedPassword, (err, result)=>{
    console.log(result);
});
// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'aaa2212');
// console.log(token);

// var decoded = jwt.verify(token, 'aaa2212');
// console.log(decoded);

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