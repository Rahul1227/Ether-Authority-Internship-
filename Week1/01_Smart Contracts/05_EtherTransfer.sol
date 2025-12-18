// This contract can receive, store, and send Ether (Ethereum's cryptocurrency).
// It teaches how money flows in and out of smart contracts. Think of it as
// a digital piggy bank that can receive and send money.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherTransfer {
    // Storing the owner's address
    address public owner;
    
    // Setting deployer as owner
    constructor() {
        owner = msg.sender;
    }
    
    // Receiving Ether into the contract
    receive() external payable {}
    
    // Checking contract's balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    // Sending Ether to another address (only owner)
    function sendEther(address payable recipient, uint256 amount) public {
        require(msg.sender == owner, "Only owner can send Ether");
        require(address(this).balance >= amount, "Not enough balance");
        
        // Transferring the specified amount
        recipient.transfer(amount);
    }
    
    // Withdrawing all Ether to owner
    function withdrawAll() public {
        require(msg.sender == owner, "Only owner can withdraw");
        
        // Sending entire balance to owner
        payable(owner).transfer(address(this).balance);
    }
}
