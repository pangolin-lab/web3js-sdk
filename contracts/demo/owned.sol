pragma solidity >=0.4.24 <0.6.0;

/**
 * The Owned contract 
 */
contract owned {
	address public owner;

	constructor() public {
		owner = msg.sender;
	}

	modifier onlyOwner { 
		require (msg.sender == owner); 
		_; 
	}

	function transferOwnership(
		address newOwner) 
	onlyOwner public {
		owner = newOwner;
	}
}

