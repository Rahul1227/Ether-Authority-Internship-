// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AchievementBadgeNFT is ERC721URIStorage, AccessControl {
    bytes32 public constant BADGE_MINTER_ROLE = keccak256("BADGE_MINTER_ROLE");

    uint256 private tokenCounter;

    event BadgeMinted(address indexed intern, uint256 indexed tokenId, string badgeURI);

    constructor() ERC721("AchievementBadge", "BADGE") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(BADGE_MINTER_ROLE, msg.sender);
    }

    function mintBadge(address intern, string calldata badgeURI)
        external
        onlyRole(BADGE_MINTER_ROLE)
    {
        tokenCounter++;
        uint256 newId = tokenCounter;
        _safeMint(intern, newId);
        _setTokenURI(newId, badgeURI);
        emit BadgeMinted(intern, newId, badgeURI);
    }

    function supportsInterface(bytes4 id)
        public
        view
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(id);
    }
}
