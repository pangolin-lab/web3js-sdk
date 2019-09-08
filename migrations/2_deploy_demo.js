var Owned = artifacts.require('./owned.sol');
var SafeMath = artifacts.require('./lib/SafeMath.sol');

var LaferraiCoin = artifacts.require('./LaferraiCoin.sol');

module.exports = function(deployer,network,accounts){
	deployer.deploy(Owned);
	deployer.link(Owned,LaferraiCoin);

	deployer.deploy(SafeMath);
	deployer.link(SafeMath,LaferraiCoin);

	deployer.deploy(LaferraiCoin);
	console.log("Demo deployed On:"+network+' By account:'+accounts[0]);
}