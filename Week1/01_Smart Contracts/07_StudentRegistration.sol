// This contract manages student registrations. Each student has an ID, name,
// and email. It's like a digital attendance sheet that stores student info
// permanently on the blockchain. Great for learning about structs and mappings.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistration {
    // Creating a structure to hold student information
    struct Student {
        uint256 studentId;
        string name;
        string email;
        bool isRegistered;
    }
    
    // Mapping student address to their information
    mapping(address => Student) public students;
    
    // Keeping track of total students
    uint256 public totalStudents;
    
    // Registering a new student
    function registerStudent(uint256 studentId, string memory studentName, string memory studentEmail) public {
        // Checking if student is not already registered
        require(!students[msg.sender].isRegistered, "Student already registered");
        
        // Creating new student record
        students[msg.sender] = Student({
            studentId: studentId,
            name: studentName,
            email: studentEmail,
            isRegistered: true
        });
        
        // Increasing total count
        totalStudents++;
    }
    
    // Getting student information by address
    function getStudent(address studentAddress) public view returns (uint256, string memory, string memory, bool) {
        Student memory student = students[studentAddress];
        return (student.studentId, student.name, student.email, student.isRegistered);
    }
    
    // Checking if a student is registered
    function isStudentRegistered(address studentAddress) public view returns (bool) {
        return students[studentAddress].isRegistered;
    }
}