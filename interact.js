require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
    const provider = new ethers.JsonRpcProvider(
        process.env.RPC_URL
    );

    const signer = await provider.getSigner(0);

    const abi = JSON.parse(
        fs.readFileSync(
            "./SimpleStorage_sol_SimpleStorage.abi",
            "utf8"
        )
    );

    const contractAddress =
        "0x3FaCff74e147e01c8BCF21C4D364b1c94141221D";

    const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
    );

    // Membaca nilai awal
    const initialValue = await contract.retrieve();
    console.log("Nilai awal:", initialValue.toString());

    // Mengirim transaksi untuk menyimpan angka 25
    console.log("Menyimpan angka 25...");

    const tx = await contract.store(25, {
        gasLimit: 100000
    });

    console.log("Hash transaksi:", tx.hash);

    // Menunggu transaksi masuk ke blok
    const receipt = await tx.wait();

    console.log("Status transaksi:", receipt.status);
    console.log("Nomor blok:", receipt.blockNumber);

    // Membaca nilai setelah transaksi
    const newValue = await contract.retrieve();
    console.log("Nilai setelah disimpan:", newValue.toString());
}

main().catch(console.error);
