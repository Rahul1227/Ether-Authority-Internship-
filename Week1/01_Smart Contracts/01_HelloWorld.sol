// This is the simplest smart contract. It stores a message on the blockchain
// and allows anyone to read it. We can also update the message.
// Think of it like a sticky note on the blockchain that anyone can read.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    // Storing the message as a state variable
    string public myMessage;
    
    // Setting initial message when contract is deployed
    constructor() {
        myMessage = "Hello World!";
    }
    
    // Updating the message to a new value
    function setMessage(string memory newMessage) public {
        myMessage = newMessage;
    }
    
    // Getting the current message
    function getMessage() public view returns (string memory) {
        return myMessage;
    }
}