const VER = "0.0.1";

var jquery = require('jquery');
const C = {
	
}

class Demo {
	constructor(options){
		this.version= VER;
		this.ctx = {};
	}
}

global.demoInstance = new Demo('Demo-abi');

console.log("Version:",demoInstance.version);