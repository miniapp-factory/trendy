import { ethers } from "ethers";

export const TRENDY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TRENDY_CONTRACT_ADDRESS ?? "";

export const TRENDY_ABI = [
  // Minimal ABI for the functions we use
  "function mintID() public payable returns (uint256)",
  "function uploadPost(string memory mediaUrl, string memory caption) public",
  "function getUserPosts(address user) public view returns (string[] memory media, string[] memory captions)",
  "function userId(address) public view returns (uint256)",
];
