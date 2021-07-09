/*const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const password = "taverne";

const salt = uid2(16);
console.log("salt is", salt);

const hash = SHA256(password + salt).toString(encBase64);
console.log("hash is:", hash);

const token = uid2(64);
console.log("token is:", token);*/

const Name = "la formation fullstack 100% JS";
const req = new RegExp(/0/g);
const result = Name.replace(req, "*");
console.log(result);
