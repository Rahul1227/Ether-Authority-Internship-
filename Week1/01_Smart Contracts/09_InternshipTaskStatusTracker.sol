// This contract tracks internship tasks and their completion status. Students
// can create tasks, mark them as complete, and view their progress. It's like
// a to-do list on the blockchain that shows your internship progress.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InternshipTracker {
    // Creating task structure
    struct Task {
        uint256 taskId;
        string taskName;
        string description;
        bool isCompleted;
        uint256 createdAt;
        uint256 completedAt;
    }
    
    // Mapping intern address to their tasks
    mapping(address => Task[]) public internTasks;
    
    // Tracking total tasks per intern
    mapping(address => uint256) public taskCount;
    
    // Creating a new task
    function createTask(string memory taskName, string memory taskDescription) public {
        // Generating new task ID
        uint256 newTaskId = internTasks[msg.sender].length;
        
        // Adding task to intern's task list
        internTasks[msg.sender].push(Task({
            taskId: newTaskId,
            taskName: taskName,
            description: taskDescription,
            isCompleted: false,
            createdAt: block.timestamp,
            completedAt: 0
        }));
        
        // Updating task count
        taskCount[msg.sender]++;
    }
    
    // Marking task as completed
    function completeTask(uint256 taskId) public {
        // Checking if task exists
        require(taskId < internTasks[msg.sender].length, "Task does not exist");
        
        // Getting the task
        Task storage task = internTasks[msg.sender][taskId];
        
        // Checking if task is not already completed
        require(!task.isCompleted, "Task already completed");
        
        // Updating task status
        task.isCompleted = true;
        task.completedAt = block.timestamp;
    }
    
    // Getting task details
    function getTask(address intern, uint256 taskId) public view returns (
        uint256,
        string memory,
        string memory,
        bool,
        uint256,
        uint256
    ) {
        require(taskId < internTasks[intern].length, "Task does not exist");
        Task memory task = internTasks[intern][taskId];
        return (
            task.taskId,
            task.taskName,
            task.description,
            task.isCompleted,
            task.createdAt,
            task.completedAt
        );
    }
    
    // Getting total number of tasks for an intern
    function getTotalTasks(address intern) public view returns (uint256) {
        return internTasks[intern].length;
    }
    
    // Calculating completion percentage
    function getCompletionRate(address intern) public view returns (uint256) {
        uint256 total = internTasks[intern].length;
        
        // Returning 0 if no tasks exist
        if (total == 0) {
            return 0;
        }
        
        // Counting completed tasks
        uint256 completed = 0;
        for (uint256 i = 0; i < total; i++) {
            if (internTasks[intern][i].isCompleted) {
                completed++;
            }
        }
        
        // Calculating percentage
        return (completed * 100) / total;
    }
}