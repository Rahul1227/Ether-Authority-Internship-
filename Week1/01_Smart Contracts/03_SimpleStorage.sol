// This contract allows storing and retrieving a number on the blockchain.
// It demonstrates how blockchain can be used as a permanent storage system.
// Any data stored here will remain forever on the blockchain.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    // Storing a favorite number
    uint256 public favoriteNumber;
    
    // Storing the number provided by user
    function store(uint256 newNumber) public {
        favoriteNumber = newNumber;
    }
    
    // Retrieving the stored number
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}
