/**
 * demo-index
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

const MetaMaskSdk = require('./lib/metamask-extends.js');

//const SDKCore = require('./sdk-core.js');

let BrowserInfo = require('./lib/utils/browserhandler.js');
const C = {
	addresses:[
		"SafeMath:0x75427b17f5cbD943e7dFe5a518b0f2842cD57FC7",
		"owned:0x321aFCB05a205f6AfE28d9D259461bbfa6b6a13b",
		"LaferraiCoin:0xeE9DFd4691d7f897086408697ebB3994E89fd253"
	]	
}

const PS = {
	appName:"Web3 SDK Demo",
	accAddrTagName:"accountAddress"
};

var DemoApp = {
	sdkCore:null,
	init:(sdk)=>{
		DemoApp.sdkCore;
		console.log('>>>');
		$('#'+PS.accAddrTagName+'').val(sdkCore.selectAddress);
		console.log('>>>2');
	}
}





$(function(){
	$(window).on('load',function(){
		let sdkCore = new MetaMaskSdk(DemoApp);
		console.log("SDK Version:",sdkCore.version);
	});
});



