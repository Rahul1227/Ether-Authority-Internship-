// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./InternRewardToken.sol";
import "./TaskCompletionToken.sol";
import "./InternshipCertificateNFT.sol";
import "./AchievementBadgeNFT.sol";

contract MintingController is AccessControl {
    bytes32 public constant BACKEND_ROLE = keccak256("BACKEND_ROLE");

    InternRewardToken public rewardToken;
    TaskCompletionToken public taskToken;
    InternshipCertificateNFT public certificateNFT;
    AchievementBadgeNFT public badgeNFT;

    constructor(
        address _rewardToken,
        address _taskToken,
        address _certificateNFT,
        address _badgeNFT
    ) {
        rewardToken = InternRewardToken(_rewardToken);
        taskToken = TaskCompletionToken(_taskToken);
        certificateNFT = InternshipCertificateNFT(_certificateNFT);
        badgeNFT = AchievementBadgeNFT(_badgeNFT);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(BACKEND_ROLE, msg.sender);
    }

    function giveReward(address intern, uint256 amount, uint256 reason) external onlyRole(BACKEND_ROLE) {
        rewardToken.rewardIntern(intern, amount, reason);
    }

    function giveTaskReward(address intern, uint256 amount, uint256 taskId) external onlyRole(BACKEND_ROLE) {
        taskToken.rewardForTask(intern, amount, taskId);
    }

    function issueCertificate(address intern, string calldata metadataURI) external onlyRole(BACKEND_ROLE) {
        certificateNFT.mintCertificate(intern, metadataURI);
    }

    function giveBadge(address intern, string calldata badgeURI) external onlyRole(BACKEND_ROLE) {
        badgeNFT.mintBadge(intern, badgeURI);
    }
}
