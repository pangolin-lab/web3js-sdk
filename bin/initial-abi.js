const AbiHandler = require('../src/lib/utils/abihandler.js');
var abiHandler = new AbiHandler('src/contracts/initabis');
abiHandler.generatorABI('true');