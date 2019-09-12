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
'use strict'; 
var jquery = require('jquery');
const ContractsManager = require('./lib/contracts-manager.js');

const C = {
	version:"0.0.1",
	addresses:[
		"SafeMath:0xA3AA394608f2C94e8492dE8A983176D040c14aDe",
		"owned:0xE229B26d01a1A715419BC54ec17792D832772495",
		"LaferraiCoin:0x1E10164CAff78701e3F08f6257feEf4D852f5682"
	]
}

let ABI = _loadABI("abis/demo-abi.json");
console.log('Load JSON:',JSON.stringify(ABI.SafeMath,null,'  '));
global.CTSManager = new ContractsManager(ABI,C.addresses);
let SafeMath = CTSManager.getContract('SafeMath');
console.log("update ABI:",JSON.stringify(SafeMath,null,'  '))
class Demo {
	constructor(options){
		this.version= C.version;
		this.ctx = {};
	}
}

global.demoInstance = new Demo('Demo-abi');

console.log("Version:",demoInstance.version);




function _loadABI(u){
	let ts = new Date().getTime();
	let json = {};
	$.ajax({
		type:"GET",
		url:u,
		async:false,
		dataType:"json",
		success:data => {
			json = data;
		},
		error:(xmlReq,status,err) => {
			console.log('Get JSON Error>',status,err);
		}
	});

	return json;
}