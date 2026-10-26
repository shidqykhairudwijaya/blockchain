
const fs = require("fs");

const abi = JSON.parse(
    fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf8"
    )
);

console.log("ABI SimpleStorage:");
console.log(abi);

console.log("\nDaftar fungsi:");

for (const item of abi) {
    if (item.type === "function") {
        console.log("-", item.name);
    }
}
