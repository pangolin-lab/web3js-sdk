const AbiHandler = require('../src/lib/utils/abihandler.js');
//abiSrc multi ABI json path
let opts = {
	abiSrc:".abis/demo",
  targetDest:"data/abis",
  targetABI:"demo-abi.json"	
}
//'src/contracts/initabis'
var abiHandler = new AbiHandler(opts);

abiHandler.generatorABI('true');