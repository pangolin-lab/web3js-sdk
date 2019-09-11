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
 * rm -rf !
 */
'use strict';
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const program = require('commander');
const C = {
	defDest:'build'
};

program
	.option('-d,--dest [path]','execute clean target path')
	.option('-e,--excludes <excludes>','excludes folder aa or aa.txt or AA:BB')
	.option('-c,--contains','clean mode:target/*,if used -e this options will invalid.');

program.parse(process.argv);

let ctx = {
	base:process.cwd(),
	dest:program.dest||C.defDest,
	contains:program.contains || false
};


if(program.excludes !== undefined){
	ctx.excludes=program.excludes;
	ctx.contains=true;
}

console.log(JSON.stringify(ctx,null,'  '));
console.log(__dirname);
console.log(__filename);
console.log('./', path.resolve('./'));


// rm -rf `ls|egrep -v '(index.php|data)'`

function clean(){
  if(!fs.existsSync(ctx.dest)){
  	//shell.exec('mkdir -p '+ctx.dest);
  	console.log(ctx.dest+'not exists.')
  	return;
  }

	if(ctx.excludes){
		let excmd = ctx.excludes.indexOf(':') != -1 ?
			ctx.excludes.split(':').join('|') : ctx.excludes;

		excmd = "rm -rf `ls|egrep -v '("+excmd+")'`";

		console.log('command:',excmd);
		shell.cd(ctx.dest);
		let log = shell.exec(excmd,{silent:true}).stdout;
		console.log('clean-excludes:',log);

		return;
	}
}

clean();