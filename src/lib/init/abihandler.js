/**
 * MetaMask Support
 *  |\_/|,,_____,~~`
 *  (.".)~~     )`~}}
 *	 \o/\ /---~\\ ~}}
 *     _//    _// ~}
 * 
 * Copyright (c) 2019 PPL,pangolin-team
 * E-mail : developer-team@pangolink.org
 * https://github.com/pangolin-lab/web3js-sdk
 *
 */
"use strict";
const DEF_CONTRACTS_SRC = "src/contracts";
const DEF_TARGET_SRC = "data/abis";
const DEF_TARGET_ABI = "core-abi.json";

var fs = require('fs');
var path = require('path');

class AbiHandler {
  
  constructor (options) {
  	this.ROOT_HOME = process.cwd();
  	this.ctx ={};
  	if(typeof options === 'string'){
  	  this.ctx['abiSrc'] = _getABISource(options);
  	}

  	if(!fs.existsSync(this.ctx['abiSrc'])){
  	  console.log("Contracts:"+this.ctx['abiSrc']);
  	  console.log("contracts abi directory not exists."+process.cwd());
  	  //process.exit(1);
  	}
  	this.ctx['coreabi'] = path.join(DEF_TARGET_SRC,DEF_TARGET_ABI);
  }

  generatorABI(cover){
  	let isCover = typeof cover === 'bool' ? cover : true;
  	console.log("overwrite>>"+ isCover);

  }

  getCtx(){
  	return this.ctx;
  }
}

/**
 *
 */
function _getABISource(p){
  return p == null ?  DEF_CONTRACTS_SRC : p;
}

module.exports = AbiHandler;


