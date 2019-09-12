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

var ABI = require('../data/abis/demo-abi.json');

const C = {
	version:"0.0.1",
	addresses:[
		"SafeMath:0xA3AA394608f2C94e8492dE8A983176D040c14aDe",
		"owned:0xE229B26d01a1A715419BC54ec17792D832772495",
		"LaferraiCoin:0x1E10164CAff78701e3F08f6257feEf4D852f5682"
	]
};

var ContractsManager = require('../src/lib/contracts-manager.js');

var cMgr = new ContractsManager(ABI,C.addresses);

console.log('end');