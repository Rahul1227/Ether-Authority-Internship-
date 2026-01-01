// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract InternshipCertificateNFT is ERC721URIStorage, AccessControl {
    bytes32 public constant CERTIFICATE_MINTER_ROLE = keccak256("CERTIFICATE_MINTER_ROLE");

    uint256 private tokenCounter;

    event CertificateMinted(address indexed intern, uint256 indexed tokenId, string metadataURI);

    constructor() ERC721("InternshipCertificate", "ICERT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CERTIFICATE_MINTER_ROLE, msg.sender);
    }

    function mintCertificate(address intern, string calldata metadataURI)
        external
        onlyRole(CERTIFICATE_MINTER_ROLE)
    {
        tokenCounter++;
        uint256 newId = tokenCounter;
        _safeMint(intern, newId);
        _setTokenURI(newId, metadataURI);
        emit CertificateMinted(intern, newId, metadataURI);
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
