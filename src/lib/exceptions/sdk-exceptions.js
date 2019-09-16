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
function SdkError(code,message,type){
	
	if(typeof code ==='number' || typeof code ==='string'){
		this.code = code;
		this.message = message || _getErrorCode(code).message;
	}else{
		this.code = _getErrorCode('999999').code;
		this.message = message || _getErrorCode('999999').message;
	}
	this.type = type || 'error';
}

SdkError.ErrorCode = [
	{"code":"100000",message:"need metamask support."},
	{"code":"999999",message:"unknow error."}
];

function _getErrorCode(code){
	let len = SdkError.ErrorCode.length;
	for(var i=0;i<len;i++){
		if(code == SdkError.ErrorCode[i]['code'])
			return SdkError.ErrorCode[i];
	}
	return {
		"code":code,
		"message":code
	}
}

SdkError.prototype = new Error();
SdkError.prototype.constructor = SdkError;

module.exports = SdkError;