
const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
    // 1. Hubungkan ke blockchain lokal Ganache
    const provider = new ethers.JsonRpcProvider(
        "http://127.0.0.1:8545"
    );

    // 2. Ambil akun pertama Ganache
    const signer = await provider.getSigner(0);

    console.log("Alamat deployer:", await signer.getAddress());

    // 3. Baca ABI dan bytecode hasil kompilasi
    const abi = JSON.parse(
        fs.readFileSync(
            "./SimpleStorage_sol_SimpleStorage.abi",
            "utf8"
        )
    );

    const bytecode =
        "0x" +
        fs.readFileSync(
            "./SimpleStorage_sol_SimpleStorage.bin",
            "utf8"
        ).trim();

    // 4. Siapkan factory untuk deployment
    const factory = new ethers.ContractFactory(
        abi,
        bytecode,
        signer
    );

    // 5. Deploy kontrak ke Ganache
    console.log("Sedang melakukan deployment...");

    const contract = await factory.deploy();

    // 6. Tunggu sampai deployment selesai
    await contract.waitForDeployment();

    console.log(
        "Alamat kontrak:",
        await contract.getAddress()
    );
}

main().catch(console.error);
