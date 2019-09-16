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

const RegexRules = {
	urlPattern: '^((https|http|ftp)://)?'//(https或http或ftp):// 可有可无
			+ '(([\\w_!~*\'()\\.&=+$%-]+: )?[\\w_!~*\'()\\.&=+$%-]+@)?' //ftp的user@  可有可无
			+ '(([0-9]{1,3}\\.){3}[0-9]{1,3}' // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
			+ '|' // 允许IP和DOMAIN（域名） 
			+ '(localhost)|'	//匹配localhost
			+ '([\\w_!~*\'()-]+\\.)*' // 域名- 至少一个[英文或数字_!~*\'()-]加上.
			+ '\\w+\\.' // 一级域名 -英文或数字  加上.
			+ '[a-zA-Z]{1,6})' // 顶级域名- 1-6位英文 
			+ '(:[0-9]{1,5})?' // 端口- :80 ,1-5位数字
			+ '((/?)|' // url无参数结尾 - 斜杆或这没有
			+ '(/[\\w_!~*\'()\\.;?:@&=+$,%#-]+)+/?)$',
	mailPattern: '^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$',
	unamePattern:'^[a-zA-Z0-9_-]{4,16}$'
}

var Validator = {
	isUrl:str=>{
		if(typeof str !== 'string')return false;
		let regex = new RegExp(RegexRules.urlPattern);
		return regex.test(str);
	},
	isEmail:str => {
		if(typeof str !== 'string')return false;
		let regex = new RegExp(RegexRules.mailPattern);
		return regex.test(str);
	},
	validUname:name =>{
		if(typeof name !== 'string')return false;
		return /^[a-zA-Z0-9_-]{4,16}$/.test(name);
	}
}

module.exports=Validator;