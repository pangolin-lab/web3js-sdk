const AbiHandler = require('../src/lib/init/abihandler.js');

var abiHandler = new AbiHandler('src/contracts/initabis');
abiHandler.generatorABI('s');
console.log('>>>>>>');
console.log(abiHandler.getCtx());