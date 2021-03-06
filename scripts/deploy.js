const hre = require("hardhat");

async function main() {
  // const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  // const nftMarket = await NFTMarket.deploy();
  // await nftMarket.deployed();
  // console.log("nftMarket deployed to:", nftMarket.address);

  // const NFT = await hre.ethers.getContractFactory("NFT");
  // const nft = await NFT.deploy(nftMarket.address);
  // await nft.deployed();
  // console.log("nft deployed to:", nft.address);

  // const Token = await ethers.getContractFactory("Token");
  // const token = await Token.deploy();
  // await token.deployed();
  // console.log("token deployed to:", token.address);

  const ChefToken = await ethers.getContractFactory("ChefToken");
  const cheftoken = await ChefToken.deploy();
  await cheftoken.deployed();
  console.log("cheftoken deployed to:", cheftoken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });