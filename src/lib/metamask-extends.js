/**
 * metamask-extends
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
const Web3 = require('web3');
const ContractsManager = require('./contracts-manager.js');
const SdkError = require('./exceptions/sdk-exceptions.js');

const C = {
	version:"0.0.1",
	addresses:[
		"SafeMath:0x75427b17f5cbD943e7dFe5a518b0f2842cD57FC7",
		"owned:0x321aFCB05a205f6AfE28d9D259461bbfa6b6a13b",
		"LaferraiCoin:0xeE9DFd4691d7f897086408697ebB3994E89fd253"
	]	
}

let ABI = _loadABI("abis/demo-abi.json");
let ABIManager = new ContractsManager(ABI,C.addresses);	

class MetaMaskSdk {
	constructor(app){
		this.version = C.version;
		this.initStat = _checkMetamask(this) ? 'success' :'failure'; 
	}
}

async function _checkMetamask(that){
	let web3Provider;
	if(window.ethereum){
		web3Provider = window.ethereum;
		that.isMetaMask = window.ethereum.isMetaMask;
		try{
			await window.ethereum.enable();
		}catch(error){
			console.log(error.message);
			throw new SdkError('100001',error.message);
		}
	}else if(window.web3){
		web3Provider = window.web3.currentProvider;
	}else{
		throw new SdkError('100000');
		//return new Web3.providers.HttpProvider(that.currentProviderUrl);
	}
	
	that.selectAddress = web3Provider.selectedAddress ||'';
	that.currentProvider = new Web3(web3Provider);
	return true;
}

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

module.exports = MetaMaskSdk;