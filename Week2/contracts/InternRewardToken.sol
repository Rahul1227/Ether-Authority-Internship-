// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract InternRewardToken is ERC20Capped, AccessControl {
    bytes32 public constant REWARD_MANAGER_ROLE = keccak256("REWARD_MANAGER_ROLE");

    event InternRewarded(address indexed intern, uint256 amount, uint256 indexed reason);

    constructor(uint256 cap)
        ERC20("InternRewardToken", "IRT")
        ERC20Capped(cap)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REWARD_MANAGER_ROLE, msg.sender);
    }

    function rewardIntern(address intern, uint256 amount, uint256 reason) external onlyRole(REWARD_MANAGER_ROLE) {
        uint256 value = amount * 10 ** decimals();
        _capMint(intern, value);
        emit InternRewarded(intern, value, reason);
    }

    function batchRewardInterns(address[] calldata interns, uint256[] calldata amounts, uint256 reason)
        external
        onlyRole(REWARD_MANAGER_ROLE)
    {
        require(interns.length == amounts.length, "length mismatch");
        for (uint256 i = 0; i < interns.length; i++) {
            uint256 value = amounts[i] * 10 ** decimals();
            _capMint(interns[i], value);
            emit InternRewarded(interns[i], value, reason);
        }
    }

    /// @dev helper used by OZ ERC20Capped
    function _capMint(address to, uint256 amount) internal {
        require(totalSupply() + amount <= cap(), "cap exceeded");
        super._mint(to, amount);
    }
}
