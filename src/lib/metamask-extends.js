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
const SdkError = require('./exceptions/sdk-exceptions.js');
const C = {
	version:"0.0.1",
	addresses:[
		"SafeMath:0x75427b17f5cbD943e7dFe5a518b0f2842cD57FC7",
		"owned:0x321aFCB05a205f6AfE28d9D259461bbfa6b6a13b",
		"LaferraiCoin:0xeE9DFd4691d7f897086408697ebB3994E89fd253"
	]	
}
class MetaMaskSdk {
	constructor(options){
		this.version = C.version;
		_checkMetamask(this);
	}
}

async function _checkMetamask(that){
	let web3Provider;
	if(window.ethereum){
		web3Provider = window.ethereum;
		that.isMetaMask = window.ethereum.isMetaMask;
		try{
			that.ethereumEnabled = await window.ethereum.enable();

			return web3Provider;
		}catch(error){
			console.log(error.message);
			throw new SdkError('100001',error.message);
		}
	}else if(window.web3){
		return window.web3.currentProvider;
	}else{
		throw new SdkError('100000');
		//return new Web3.providers.HttpProvider(that.currentProviderUrl);
	}
}



module.exports = MetaMaskSdk;