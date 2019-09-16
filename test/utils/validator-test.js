const Validator = require('../../src/lib/utils/regexvalidator.js');

let url = "http://127.0.0.1:7545";

console.log("url:"+url+'>>',Validator.isUrl(url));

console.log('name valid:',Validator.validUname('lsdf_92'));