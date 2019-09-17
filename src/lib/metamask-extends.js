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
//const SdkError = require('./exceptions/sdk-exceptions.js');
const Web3 = require('web3');
const ContractsManager = require('./contracts-manager.js');
const SdkError = require('./exceptions/sdk-exceptions.js');
const networks = require('./utils/networks.js');

const C = {
	version:"0.0.1",
	addresses:[
		"safemath:0x1AbEa9F293Bd1c57bA38A9444E3F8FC644c1ddC3",
		"CountachToken:0x8E7e1b0117eB52Bd03F6e7c93608145FdCEC59c4"
	],
	abiAjax:{
		url:"/abis/core-abi.json",
		type:"GET"
	}
}

const PullABIJsonAjax = params =>{
	return new Promise((resolve,reject)=>{
		jQuery.ajax({
			url:params.url,
			type:params.type||'get',
			dataType:'json',
			headers:params.headers ||{},
			data:params.data || {},
			success:(res)=>{
				resolve(res)
			},
			error:(err)=>{
				console.error(err.msg);
				reject(err.message);
			}
		})
	})
}


class MetaMaskSdk {
	constructor(){
		this.version = C.version;
		this.completed = false;
		this.networks = networks;

		//await this.init();
	}

	async init(...agrs){
		this.completed = true;
		let ABI = _loadABI(C.abiAjax.url);
		let ABIManager = new ContractsManager(ABI,C.addresses);	
		this.ABIManager = ABIManager;
		await _checkMetamask(this);
		this.completed = true;
		return this;
	}

	getNetwork(id){
		let _id = id ||this.networkVersion;
		let len = networks.length;
		for(var i =0;i<len;i++){
			if(networks[i].id == _id)
				return networks[i];
		}
		return false;
	}

	async getBalance(account,unit){
		if(!this.web3)throw new SdkError('900001');
		let w3 = this.web3;
		let address = account || this.selectAddress;
		const balance = await w3.eth.getBalance(address).then(b=>{
			if(typeof unit === 'string' && unit.toLowerCase() !='wei'){
				b = w3.utils.fromWei(b,unit.toLowerCase());
			}			
			return b;
		});
		return balance;
	}

	// async getWeb3Contract(id){
	// 	if(!this.completed || !this.ABIManager ){
	// 		return false;
	// 	}

	// 	let contract = this.ABIManager.getContract(id);
	// 	if(!contract || !contract.abi || !contract.abi.length)return false;
	// 	return this.web3.eth.contract(contract.abi);
	// }
}

async function _checkMetamask(that){
	let web3Provider;
	if(window.ethereum){
		web3Provider = window.ethereum;
		that.ethereum = window.ethereum;
		that.isMetaMask = window.ethereum.isMetaMask;
		that.networkVersion = window.ethereum.networkVersion;
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
	that.web3 = new Web3(web3Provider);
	return true;
}

/* =============== INNER METHOD ================ */
/**
 * load ABI Json File
 */
function _loadABI(u){
	let ts = new Date().getTime();
	let json = {};
	$.ajaxSettings.async = false;
	$.ajax({
		type:"GET",
		url:u+'?dts='+ts,
		async:false,
		dataType:"json",
		success:data => {
			json = data;
		},
		error:(xmlReq,status,err) => {
			console.log('Get JSON Error>',status,err);
		}
	});
	$.ajaxSettings.async = true;
	return json;
}

module.exports = MetaMaskSdk;