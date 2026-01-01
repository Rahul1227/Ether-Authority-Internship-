// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TaskCompletionToken is ERC20Capped, AccessControl {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    event TaskRewarded(address indexed intern, uint256 amount, uint256 indexed taskId);

    constructor(uint256 cap)
        ERC20("TaskCompletionToken", "TCT")
        ERC20Capped(cap)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
    }

    function rewardForTask(address intern, uint256 amount, uint256 taskId)
        external
        onlyRole(VERIFIER_ROLE)
    {
        uint256 value = amount * 10 ** decimals();
        _capMint(intern, value);
        emit TaskRewarded(intern, value, taskId);
    }

    function _capMint(address to, uint256 amount) internal {
        require(totalSupply() + amount <= cap(), "cap exceeded");
        super._mint(to, amount);
    }
}
