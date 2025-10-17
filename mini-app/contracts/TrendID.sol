pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TrendID is ERC721URIStorage, Ownable {
    uint256 public nextTokenId = 1;
    mapping(address => uint256) public userId;
    mapping(uint256 => string) public postMedia;
    mapping(uint256 => string) public postCaption;

    uint256 public mintFee = 130000000000000; // 0.00013 BASE (in wei)

    event IDMinted(address indexed user, uint256 tokenId);
    event PostUploaded(address indexed user, uint256 tokenId, string mediaUrl, string caption);

    constructor() ERC721("TRENDY ID", "TRID") {}

    function mintID() external payable returns (uint256) {
        require(userId[msg.sender] == 0, "ID already minted");
        require(msg.value == mintFee, "Incorrect fee");

        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        userId[msg.sender] = tokenId;

        emit IDMinted(msg.sender, tokenId);
        return tokenId;
    }

    function uploadPost(string calldata mediaUrl, string calldata caption) external {
        uint256 tokenId = userId[msg.sender];
        require(tokenId != 0, "No ID");

        postMedia[tokenId] = mediaUrl;
        postCaption[tokenId] = caption;

        emit PostUploaded(msg.sender, tokenId, mediaUrl, caption);
    }

    function getUserPosts(address user) external view returns (string[] memory media, string[] memory captions) {
        uint256 tokenId = userId[user];
        require(tokenId != 0, "No ID");

        media = new string[](1);
        captions = new string[](1);
        media[0] = postMedia[tokenId];
        captions[0] = postCaption[tokenId];
    }
}
