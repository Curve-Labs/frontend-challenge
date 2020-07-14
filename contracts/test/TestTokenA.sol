pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';

// HACK to workaround truffle artifact loading on dependencies
contract TestTokenA is ERC20, ERC20Mintable {
  string private _name;
  string private _symbol;
  uint8 private _decimals;

  constructor() public {
    _name = 'tokenA';
    _symbol = 'TOKENA';
    _decimals = 18;
  }
}
