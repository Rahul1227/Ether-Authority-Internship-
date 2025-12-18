// This contract demonstrates account management on Ethereum. It shows how
// addresses work and how to verify ownership. Each Ethereum account has
// a unique address, like a bank account number.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountOwnership {
    // Storing account information
    address public accountOwner;
    string public ownerName;
    uint256 public registrationTime;
    
    // Registering the account with owner details
    constructor(string memory name) {
        accountOwner = msg.sender;
        ownerName = name;
        registrationTime = block.timestamp;
    }
    
    // Verifying if caller is the account owner
    function verifyOwnership() public view returns (bool) {
        return msg.sender == accountOwner;
    }
    
    // Getting account information
    function getAccountInfo() public view returns (address, string memory, uint256) {
        return (accountOwner, ownerName, registrationTime);
    }
    
    // Updating owner name (only owner can do this)
    function updateName(string memory newName) public {
        require(msg.sender == accountOwner, "Only owner can update name");
        ownerName = newName;
    }
}
