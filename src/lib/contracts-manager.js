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
	constructor(abiJson,...addressPair){
		let that = this;
		that.contracts = abiJson;
		if(typeof addressPair !=='undefined' ){
			addressPair.forEach(pair =>{
				if(typeof pair !=='string' 
					|| pair.indexOf(':')==-1
					|| pair.split(':').length <2)
					continue;
				let kvs = pair.split(':');
				that.setContractsAddress(kvs[0],kvs[1]);
			});
		}
	}

	setContractsAddress(id,address){
		let abis = this.contracts;
		if(id in this.contracts)this.contracts[id]=address;
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
} 

