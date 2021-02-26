const hre = require("hardhat");
const web3 = require("web3");
const tokenManager = "0xf809b7f87e56a38df4a17907fbe736e979ebf8be";

const toWei = (num) => web3.utils.toWei(num.toString());

const chunkArray = (myArray, chunk_size) => {
	var results = [];
	while (myArray.length) {
		results.push(myArray.splice(0, chunk_size));
	}
	return results;
};

async function main() {
	const BatchVest = await hre.ethers.getContractFactory("BatchVest");
	const batchVest = await BatchVest.deploy(tokenManager);
	await batchVest.deployed();
	await tenderly.verify({
		name: "BatchVest",
		address: batchVest.address,
	});
	await tenderly.push({
		name: "BatchVest",
		address: batchVest.address,
	});
	console.log("batchVest deployed to:", batchVest.address);

	//await vestAirdrop(batchVest);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
