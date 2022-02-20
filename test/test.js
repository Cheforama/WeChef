// describe("NFTMarket", function() {
//   it("Should create and execute market sales", async function() {
//     /* deploy the marketplace */
//     const Market = await ethers.getContractFactory("NFTMarket")
//     const market = await Market.deploy()
//     await market.deployed()
//     const marketAddress = market.address

//     /* deploy the NFT contract */
//     const NFT = await ethers.getContractFactory("NFT")
//     const nft = await NFT.deploy(marketAddress)
//     await nft.deployed()
//     const nftContractAddress = nft.address

//     /* deploy the payment token contract */
//     const Token = await ethers.getContractFactory("Token")
//     const token = await Token.deploy()
//     await token.deployed()
//     const paymentTokenAddress = token.address

//     const [_, buyerAddress, sellerAddress] = await ethers.getSigners()

//     await token.transfer(sellerAddress.address, 50)
//     await token.transfer(buyerAddress.address, 50)

//     let listingPrice = await market.getListingPrice()
//     listingPrice = listingPrice.toString()

//     const auctionPrice = ethers.utils.parseUnits('1', 'ether')

//      create two tokens 
//     await nft.createToken("https://www.mytokenlocation.com")
//     await nft.createToken("https://www.mytokenlocation2.com")

    

//     await token.connect(sellerAddress).approve(market.address, 2)

//     /* put both tokens for sale */
//     await market.createMarketItem(nftContractAddress, 1, auctionPrice, paymentTokenAddress)
//     await market.createMarketItem(nftContractAddress, 2, auctionPrice, paymentTokenAddress)

//     await token.connect(buyerAddress).approve(market.address, 2)

//     /* execute sale of NFT token to another user */
//     await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, paymentTokenAddress)

//     /* query for and return the unsold items */
//     items = await market.fetchMarketItems()
//     items = await Promise.all(items.map(async i => {
//       const tokenUri = await nft.tokenURI(i.tokenId)
//       let item = {
//         price: i.price.toString(),
//         tokenId: i.tokenId.toString(),
//         seller: i.seller,
//         owner: i.owner,
//         tokenUri
//       }
//       return item
//     }))
//     console.log('items: ', items)
//   })
// })

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20 ChefToken", function () {

  let chefToken;
  let owner;
  let addr1;
  let addr2;

  this.beforeEach(async function(){
    const ChefToken = await ethers.getContractFactory("ChefToken");
    const chefToken = await ChefToken.deploy();
    await chefToken.deployed()
    const [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should successfully deploy", async function () {
    console.log('success');
  });

  it("Should deploy with 5B of supply for the owner of the contract", async function(){
    
    const decimals = await chefToken.decimals();
    const balance = await chefToken.balanceOf(owner.address);
    console.log(ethers.balance);
    expect(await ethers.balance.to.equal(ChefToken.totalsupply()));
  });

  it("Should let you send tokens to another address", async function(){
    await chefToken.transfer(addr1.address, ethers.utils.parseEther("100"));
    expect(await chefToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("92"));
  });

  it("Should let you give another address to approval to send on yout behalf ", async function(){
    await chefToken.connect(addr1).approve(owner.address, ethers.utils.parseEther("1000"));
    await chefToken.transfer(addr1.address, ethers.utils.parseEther("1000"));
    await chefToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("920"));
    expect(await chefToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("736"));
  });
});