pragma solidity >=0.4.24 <0.6.0;


import "./lib/SafeMath.sol";
import "./interface/IERC20.sol";
import "./owned.sol";


/**
 * The LamborghinCountachCoin contract
 */
contract LaferraiCoin is IERC20,owned {
	using SafeMath for uint256;

	string public constant symbol = "LC";
	string public constant name ="Laferrai Coin";

	uint8 public constant decimals = 18;
	uint256 constant INITIAL_SUPPLY = 4.2e8 * (10*uint256(decimals));

	uint256 private _totalSupply;
	mapping (address => uint256) private _balances;
	mapping (address => mapping(address => uint256)) private _allowed;
	

	constructor () public{
		_mint(msg.sender,INITIAL_SUPPLY);
	}

	function totalSupply()public view returns(uint256){
		return _totalSupply;
	}

	function balanceOf(address _owner)public view returns(uint256){
		return _balances[_owner];
	}

	/**
	 * @dev transfer Token to the Address amount
	 * @param to address who will accept 
	 * @param value uint256 the amount
	 */
	function transfer(
		address to,
		uint256 value)
	public returns(bool){

		require (value <= _balances[msg.sender]);

		require (to != address(0));

		_balances[msg.sender] = _balances[msg.sender].sub(value);
		_balances[to] = _balances[to].add(value);
		emit Transfer(msg.sender,to,value);
		return true;
	}

	function transferFrom(
		address from,
		address to,
		uint256 value)
	public returns(bool){
		require (value <= _balances[from]);
		require (value <= _allowed[from][msg.sender]);
		require (to != address(0));

		_balances[from] = _balances[from].sub(value);
		_balances[to] = _balances[to].add(value);
		_allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
		
		emit Transfer(from,to,value);
		return true;
	}

	/**
	 * @dev approval someone to amount
	 *
	 */
	function approve(
		address spender,
		uint256 value) 
	public returns(bool){
		require(spender != address(0));

		_allowed[msg.sender][spender] = value;

		emit Approval(msg.sender,spender,value);
		return true;
	}

	/**
	 * @dev get owner allowanced to someone amount
	 *
	 */
	function allowance(
		address owner,
		address spender)
	public view returns(uint256){
		return _allowed[owner][spender];
	}


  /**
   * @dev initial supply
   * @param account address initial address
   * @param _value uint256 initial or increase amount
   */
	function _mint(
		address account,
		uint256 _value) 
	internal {
		require (account != address(0));
		_totalSupply = _totalSupply.add(_value);
		_balances[account] = _balances[account].add(_value);

		emit Transfer(address(0),account,_value);
	}
}


