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
		"SafeMath:0x75427b17f5cbD943e7dFe5a518b0f2842cD57FC7",
		"owned:0x321aFCB05a205f6AfE28d9D259461bbfa6b6a13b",
		"LaferraiCoin:0xeE9DFd4691d7f897086408697ebB3994E89fd253"
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