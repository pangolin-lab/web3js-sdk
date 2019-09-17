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
global.sdkCore = new MetaMaskSdk();

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
	accAddrTagName:"accountAddress",
	netTagName:"network",
	gasPriceTagName:"gasPrice",
	accountBalanceTagName:"accountBalance"
};

var DemoApp = {
	init:(sdk)=>{
		this.sdk = sdk;
		console.log('>>>CountachToken:',JSON.stringify(sdk.ABIManager.getContract('CountachToken'),null,' '));
		initPage(sdk);
		console.log('>>>2');
		//
		bindingOperator(sdk);
	}

}

function initPage(sdk){
		$('#'+PS.accAddrTagName+'').val(sdk.selectAddress);
		let netName = sdk.getNetwork() ? sdk.getNetwork().name : 'Unknown';
		$('input[name='+PS.netTagName+']').val(netName);	
		let w3 = sdk.web3;
		w3.eth.getGasPrice().then((price)=>{
			let gasEth = w3.utils.fromWei(price,'ether');
			console.log(w3.utils.fromWei(price,'ether'));
			$('input[name='+PS.gasPriceTagName+']').val(gasEth+' eth');
		});

		sdk.getBalance('',"ether").then(balance=>{
			console.log('balance:',balance);
			$('input[name='+PS.accountBalanceTagName+']').val(balance+' eth');
		});
		

		if(sdk.ethereum){
			sdk.ethereum.on('accountsChanged',(accounts)=>{
				console.log("Account changed.", accounts);
				sdk.selectAddress = accounts[0];
				$('#'+PS.accAddrTagName+'').val(sdk.selectAddress);

				sdk.getBalance('',"ether").then(balance=>{
					console.log('balance:',balance);
					$('input[name='+PS.accountBalanceTagName+']').val(balance+' eth');
				});
			});
		}

		// let CTWeb3Contract =await sdk.getWeb3Contract('CountachToken');
		// if(CTWeb3Contract)global.CountachTokenWeb3Contract = CTWeb3Contract;
		//	
}

function getBalance(address){

}

/**
 *
 */
function bindingOperator(sdk){
	$('.accountBalanceBtn').on('click',function(e){

		let acc = $('#'+PS.accAddrTagName+'').val();
		if(!acc){
			$('span.accountAddress').removeClass('d-none');
			return;
		}else{
			$('span.accountAddress').addClass('d-none');
		}
		sdk.getBalance(acc,"ether").then(balance=>{
			console.log('balance:',balance);
			$('input[name='+PS.accountBalanceTagName+']').val(balance+' eth');
		});
		e.stopPropagation();
		return false;
	});
}



$(function(){
	$(window).on('load',function(){
		sdkCore.init().then(sdk=>{
			DemoApp.init(sdk);
		});
	
		console.log("SDK Version:",sdkCore.version);
	});
});



