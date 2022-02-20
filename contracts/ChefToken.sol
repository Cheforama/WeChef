// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChefToken is ERC20, Ownable {

    //Tax Address
    address target_1 = 0xeB46756a26F58837Df192F378859AAbf4cE20639;

    //Variables
    uint public taxRate = 8;
    mapping (address => bool) public isBlacklisted; //Tracks blacklisted addresses
    mapping (address => bool) public taxExcluded; //Tracks adresses excluded from paying tax (applicable for the address sending tokens)
    

    constructor() ERC20("Cheforama", "CHEF") {
        _mint(msg.sender, 5000000000 * 10 ** decimals());
    }

    //Change percentage rate of tax, max rate limited to 10%
    function changeTax (uint256 _newTax) onlyOwner public {
        require(_newTax <= 10, "New rate exceeds max tax limit of 10%");
        taxRate = _newTax;
    }

    //Change tax collecting address
    function changeTarget (uint256 _target, address _newTarget) onlyOwner public {
	if (_target == 1){target_1  = _newTarget;}
   }

   //Add address to blacklist
    function addToBlackList(address _account) external onlyOwner {
        isBlacklisted[_account] = true;
    }
    //Remove an address from blacklist
    function removeFromBlackList(address _account) external onlyOwner {
        isBlacklisted[_account] = false;
    }

    //Disable tax payment for an address
    function excludeFromTax(address _account) external onlyOwner {
        taxExcluded[_account] = true;
    }
    //Enable tax for certain address
    function addToTax(address _account) external onlyOwner {
        taxExcluded[_account] = false;
    }

    function _transfer(address _from, address _to, uint256 _amount) internal override {
        require(_to != address(0), "transfer to the zero address"); 
        require(_from != address(0), "transfer from the zero address");
        require(!isBlacklisted[_from] && !isBlacklisted[_to], "This address is blacklisted");

        if (taxExcluded[_from] == true) {
            super._transfer(_from, _to, _amount);
        }
        else{
            
            uint taxShare = (_amount * taxRate)/100;
            
            super._transfer(_from, target_1, taxShare);
            super._transfer(_from, _to, _amount-taxShare);

        }
   
    }

}
