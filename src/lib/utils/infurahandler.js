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
var envResult = require('dotenv').config(); 
const C = {
 	version:"v3",
 	netmode:"ropsten",
 	domain:"infura.io",
 	protocol:"https",
 	networks:[
 	{id:1,name:"Mainnet"},
 	{id:3,name:"Ropsten"},
 	{id:4,name:"Rinkeby"},
 	{id:42,name:"kovan"},
 	{id:5,name:"goerli"} 
 	],
 	supportProts:"https wss ipfs"
};

function _getNetmode(mode){
 	for(var i=0,len=C.networks.length;i++;){
 		if(mode.toLowerCase()==C.networks[i].name.toLowerCase())
 			return mode.toLowerCase();
 	}
 	return C.netmode;
}

function _getProtocol(prot){
 	if(C.supportProts.indexOf(prot.toLowerCase()))
 		return prot.toLowerCase();
 	return C.protocol;
}

function InfuraHandler(options) {
	let ctx = {
 		version:C.version,
 		domain: C.domain,
 		protocol:C.protocol
 	};

  	/**
   	 * comments: get the Web3Provider url *
     */
    ctx.getProvider = function(){
		let _this = this;
		
	 	if(!_this.projectId && typeof (process.env.INFURA_PROJECTID) !=='string'){
			console.log('No Infura ProjectId set. program exit.');
			process.exit(1);
		}

   		switch(_this.protocol){
   			case 'https':
   				return 'https://'+_this.netmode +'.' + _this.domain +
   				'/' + _this.version +'/'+_this.projectId;
   			case 'wss':
   				return 'wss://'+_this.netmode +'.' + _this.domain +
   				'/ws/' + _this.version +'/'+_this.projectId;
   			case 'ipfs':
   				return 'https://'+_this.netmode +'.' + _this.domain +
   				'/ipfs/';
   			default:
   				return 'https://'+_this.netmode +'.' + _this.domain +
   				'/' + _this.version +'/'+_this.projectId;
   		}
    }

   	if(process.env && 
   		typeof process.env.INFURA_PROJECTID === 'string'){
   		ctx.projectId = process.env.INFURA_PROJECTID;
   	}

	if(typeof options === 'string'){
		ctx.netmode = _getNetmode(options);
	}else if(typeof options ==='object'){
		if(options['netmode'] && typeof (options['netmode']) ==='string'){
			ctx.netmode = _getNetmode(options['netmode']);
		}

		if(options['protocol'] && typeof (options['protocol']) ==='string'){
			ctx.protocol = _getProtocol(options['protocol']);
		}
		if(options['projectId'] && typeof (options['projectId']) ==='string'){
			ctx.projectId = options['projectId'];
		}
	}


	return ctx;
}

module.exports = InfuraHandler;