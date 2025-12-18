// This contract implements a basic voting system. People can vote for candidates,
// and each person can only vote once. It's like a class election where everyone
// gets one vote and we can see the results transparently.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleVoting {
    // Creating candidate structure
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    
    // Storing all candidates
    mapping(uint256 => Candidate) public candidates;
    
    // Tracking who has voted
    mapping(address => bool) public hasVoted;
    
    // Counting total candidates
    uint256 public candidatesCount;
    
    // Adding a new candidate
    function addCandidate(string memory candidateName) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, candidateName, 0);
    }
    
    // Casting a vote for a candidate
    function vote(uint256 candidateId) public {
        // Making sure person hasn't voted before
        require(!hasVoted[msg.sender], "You have already voted");
        
        // Checking if candidate exists
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate");
        
        // Recording the vote
        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount++;
    }
    
    // Getting candidate details
    function getCandidate(uint256 candidateId) public view returns (uint256, string memory, uint256) {
        Candidate memory candidate = candidates[candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }
}
