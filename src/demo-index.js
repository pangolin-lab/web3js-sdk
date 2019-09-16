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

const MetaMaskSdk = require('./lib/metamask-extends.js');

//const SDKCore = require('./sdk-core.js');

global.BrowserInfo = require('./lib/utils/browserhandler.js');
const C = {
	addresses:[
		"SafeMath:0x75427b17f5cbD943e7dFe5a518b0f2842cD57FC7",
		"owned:0x321aFCB05a205f6AfE28d9D259461bbfa6b6a13b",
		"LaferraiCoin:0xeE9DFd4691d7f897086408697ebB3994E89fd253"
	]	
}

let ABI = _loadABI("abis/demo-abi.json");
global.ABIManager = new ContractsManager(ABI,C.addresses);	
global.sdkCore = new MetaMaskSdk();

class Demo {
	constructor(options){
		this.version= sdkCore.version;
		this.ctx = {};
	}
}

global.demoInstance = new Demo('Demo-abi');

console.log("Version:",demoInstance.version);

/* =============== INNER METHOD ================ */
/**
 * load ABI Json File
 */
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
