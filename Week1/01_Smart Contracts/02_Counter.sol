// This contract maintains a counter that can be increased or decreased.
// It's useful for learning about state changes and basic functions.
// Like a tally counter you might use to count people entering a room.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    // Storing the count value
    uint256 public count;
    
    // Starting counter at zero
    constructor() {
        count = 0;
    }
    
    // Increasing the counter by 1
    function increment() public {
        count = count + 1;
    }
    
    // Decreasing the counter by 1
    function decrement() public {
        // Making sure count doesn't go below zero
        require(count > 0, "Counter cannot go below zero");
        count = count - 1;
    }
    
    // Getting current count value
    function getCount() public view returns (uint256) {
        return count;
    }
    
    // Resetting counter back to zero
    function reset() public {
        count = 0;
    }
}