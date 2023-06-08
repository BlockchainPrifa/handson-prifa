// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {

    constructor(uint256 initialSupply) ERC20("Test Token", "Test") {
        _mint(msg.sender, initialSupply);
    }

    function airDropToken() public {
        _mint(msg.sender, 100000000000000000000);
    }
}