const hre = require("hardhat");
const web3 = require("web3");
const airdrop = require("./lists/airdropList");
const tokenManager = "0xd6dcbcdbfd745825abc0fef0204fb3109dc30329 ";

const toWei = (num) => web3.utils.toWei(num.toString());

const chunkArray = (myArray, chunk_size) => {
	var results = [];
	while (myArray.length) {
		results.push(myArray.splice(0, chunk_size));
	}
	return results;
};

const vestAirdrop = async (batchVest) => {
	// mint and vest seed
	// 1613848115: Saturday, 20 February 2021 19:08:35
	// 1614513600: Sunday, 28 February 2021 12:00:00
	// 1646049600: Monday, 28 February 2022 12:00:00
	const start = 1613848115;
	const cliff = 1614513600;
	const vesting = 1614513600;
	const tranche = chunkArray(airdrop, 40);

	while (tranche.length > 0) {
		const chunk = tranche.pop();
		console.log("----------");
		await batchVest.vest(
			chunk.map((user) => user[0]),
			chunk.map((user) => toWei(user[1])),
			start,
			cliff,
			vesting,
			false
		);
		console.log(
			`\nvested to ${chunk.length} addresses\nbatches remaining: ${tranche.length}\n`
		);
	}
};

const batch = async (batchVest, tranche) => {
	// mint and vest seed
	// 1613848115: Saturday, 20 February 2021 19:08:35
	// 1614513600: Sunday, 28 February 2021 12:00:00
	// 1646049600: Monday, 28 February 2022 12:00:00
	const start = 1613848115;
	const cliff = 1614513600;
	const vesting = 1614513600;


	console.log("----------");
	const tx = await batchVest.vest(
		tranche.map((user) => user[0]),
		tranche.map((user) => toWei(user[1])),
		start,
		cliff,
		vesting,
		false
	);
	tx.wait(1)
	console.log(tx.hash)
	console.log(
		`\nvested to ${tranche.length} addresses\n`
	);
};
const b = [	["0xD0cf0a50568D84842A2995ef6D94577C3dA5f777", 89.29816929],
["0xFBC56Be13C23c18B6864D062e413da3c7e0f74Fb", 89.29816929],
["0xB24b54FE5a3ADcB4cb3B27d31B6C7f7E9F6A73a7", 89.29816929],
["0x8d5F2062986808d372a6ba259A3Fc3e033e7D37C", 89.29816929],
["0xc25960e595718AC2D4A57D1F6e727704541d0a2b", 89.29816929],
["0x9194b1713A8E07Bc47B90Fb7937E28e09b6cd100", 89.29816929],
["0xDF290293C4A4d6eBe38Fd7085d7721041f927E0a", 89.29816929],
["0x93A06fF592adCb6D0EaB82a88DB52D3329541Bb8", 89.29816929],
["0xed0F0c4DE6150B7E3262e537D9691fc750B2Ba23", 89.29816929],
["0x9918ccC83f453965E634eB0788f94729775554c0", 89.29816929],
["0xC1582C0E57A144131d0546128203e8FC6924b17f", 89.29816929],
["0xABccAdAc2ab9777B4Af32f0DA9a6464086ed3D56", 89.29816929],
["0xccb78FE2dAc3349CA4415815A74e960FDae53355", 89.29816929],
["0xAc5Fd75479aC4bB5a6600bBA236A9962F555f6E8", 89.29816929],
["0xdec0DED0606B7d0560ADEBD6C3a919a671dB4D66", 89.29816929],
["0xAE4076912111A01da810Fbfe8cbD9ce0b881fF78", 89.29816929],
["0xe54bee8258A2fE65095516f199034a08C02E35fE", 89.29816929],
["0xB22981bA3FE1De2325935c91a3B717168fB86714", 89.29816929],
["0xf632Ce27Ea72deA30d30C1A9700B6b3bCeAA05cF", 89.29816929],
["0x60a9372862bD752CD02D9AE482F94Cd2fe92A0Bf", 89.29816929],
["0x47a2eb88539359D5cd0388Eb3bEE8b33D0B49D7c", 89.29816929],
["0x3f15a8d593a6626B23eAd270F7B1085ae23BA469", 89.29816929],
["0x151EaaA48bbD08B7Cc37B52216Cf54f54c41b24b", 89.29816929],
["0x501e49B4C1CAFBba54C6967fa3e32a4Edd2df589", 89.29816929],
["0x17a7E7F6A493d137E84B4420575527f6Ef725F8C", 89.29816929],
["0x3EdcEC2e8a11a4A2e7b482DDdeE53D5eFa75E50f", 89.29816929],
["0x183bDB344A07Ee3D27f07AC4799A56E4A2fE5439", 89.29816929],
["0x436Bb9e1f02C9cA7164afb5753C03c071430216d", 89.29816929],
["0x1a86F6CA6CaEDEb6dd8eFa9bde15c5B2387f0039", 89.29816929],
["0x4B7C0Da1C299Ce824f55A0190Efb13663442FA2c", 89.29816929],
["0x24B48C96876D4A56519f98bfa0A337E8E9bfCAe7", 89.29816929],
["0x5A21376F13DDBf114D5BF42315475F99a39743d5", 89.29816929],
["0x2a10C2Cac2c5d1ea94C2526C8A541154A4071C3c", 89.29816929],
["0x625236038836CecC532664915BD0399647E7826b", 89.29816929]]
async function main() {
	const BatchVest = await hre.ethers.getContractAt(
		"BatchVest",
		"0xdEcb3A5221bEbFe864BFEE7278b9cda7587F25D3"
	);

	await batch(BatchVest,b);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
