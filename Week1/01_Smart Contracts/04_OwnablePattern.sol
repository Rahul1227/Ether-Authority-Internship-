// This contract implements ownership functionality. Only the owner (person who
// deployed the contract) can perform certain actions. This is crucial for
// security - like having an admin account that has special privileges.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    // Storing the owner's address
    address public owner;
    
    // Setting the person who deploys as owner
    constructor() {
        owner = msg.sender;
    }
    
    // Checking if caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Transferring ownership to new address (only owner can do this)
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
}
