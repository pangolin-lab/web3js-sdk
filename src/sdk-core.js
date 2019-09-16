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
const Networks = require('./lib/utils/networks.js');
const InfuraHandler = require('./lib/utils/infurahandler.js');
const Web3 = require('web3');


const C = {
	version:"0.0.2",
	
	addresses:[
		"SafeMath:0x75427b17f5cbD943e7dFe5a518b0f2842cD57FC7",
		"owned:0x321aFCB05a205f6AfE28d9D259461bbfa6b6a13b",
		"LaferraiCoin:0xeE9DFd4691d7f897086408697ebB3994E89fd253"
	],
	"ModeOptions":{
		"providerUrl":"http://127.0.0.1:7545",
		"netmode":"ropsten",
		"projectId":"b6e1952f8a214a2cba9784b907aba833",
		"secret":"23fdae0460e04c0fb528b327f2e22b08"
	}
};


class SDKCore {
	constructor(url){
		this.version = C.version;
		this.network = C.ModeOptions.netmode;
		if(this.network == 'dev'){
			this.currentProviderUrl = url || C.ModeOptions.providerUrl;
		}else{
			var infura = InfuraHandler(C.ModeOptions);
			this.network = infura.netmode;
			this.currentProviderUrl = infura.getProvider();
		}

		let _provider = _handleProvider(this);
		if(_provider){
			this.web3 = new Web3(_provider);
			//TODO extends web3 https://web3js.readthedocs.io/en/v1.2.0/web3.html#extend
		}
	}


}


async function _handleProvider(that){
	let web3Provider;
	if(window.ethereum){
		web3Provider = window.ethereum;
		that.isMetaMask = window.ethereum.isMetaMask;
		try{
			await window.ethereum.enable();
			return web3Provider;
		}catch(error){
			console.error("User denied account access.");
		}
	}else if(window.web3){
		return window.web3.currentProvider;
	}else{
		return new Web3.providers.HttpProvider(that.currentProviderUrl);
	}
}

function _loadABIManager(that){

}



module.exports=SDKCore