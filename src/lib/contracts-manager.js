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
class ContractsManager{

	/**
	 * abiJson 
	 * addressPair id:address
	 */
	constructor(abiJson,addressPair){
		let that = this;
		that.contracts = abiJson;
		if(typeof addressPair ==='object' && addressPair.length>0){

			addressPair.forEach(pair=>{
				if(typeof pair ==='string' 
					&& pair.indexOf(':') != -1 
					&& pair.split(':').length >1){
					let kvs = pair.split(':');
					that.setContractsAddress(kvs[0],kvs[1]);					
				}
			});
		}
	}

	setContractsAddress(id,address){
		let abis = this.contracts;
		if(id in this.contracts){
			console.log('Update'+id+' Adress:',this.contracts[id]['address'],' to ',address);
			this.contracts[id]['address']=address;
		}
	}

	getContract(id){
		if(id in this.contracts)return this.contracts[id];
		return false;
	}

	getContracts(){
		return this.contracts||{};
	}

	updateContract(id,abi,address){
		if(typeof id !== 'string' || 
			typeof abi !=='object' || !abi.length)return false;
		this.contracts[id]=abi;
		if(typeof address == 'string'){
			this.contracts[id]['address']=address;
		}
	}

	loadTruffleContract(contract,address){
		if(typeof contract !=='object' 
			|| ! "contractName" in contract
			|| ! "abi" in contract)
			return false;
		if(typeof contract.contractName !=='string')return false;
		if(contract.abi.length == undefined)return false;

		let id = contract.contractName;
		let json = {"abi":contract.abi};
		if(typeof address === 'string'){
			json['address']=address;
		}else{
			let ad = _parseAddress(contract.networks);
			if(ad)json['address']=ad;
		}

		let exists = this.getContract(id);
		if(exists) json = Object.assign({},exists,json);
	}
} 

function _parseAddress(networks){
	if(typeof networks !== 'object' || networks.length )return false;
	var keys = Object.keys(networks);
	let address=false;

	Object.keys(networks).map(item=>{
		if(networks[item]['address'])
			address = networks[item]['address'];
	});
	return address;
}

module.exports=ContractsManager;

