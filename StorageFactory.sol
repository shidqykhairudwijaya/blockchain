
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] public storageContracts;

    // Membuat kontrak SimpleStorage baru
    function createSimpleStorageContract() public {
        SimpleStorage newStorage = new SimpleStorage();
        storageContracts.push(newStorage);
    }

    // Menyimpan angka pada kontrak berdasarkan indeks
    function sfStore(uint256 _index, uint256 _number) public {
        storageContracts[_index].store(_number);
    }

    // Mengambil angka berdasarkan indeks
    function sfGet(uint256 _index) public view returns (uint256) {
        return storageContracts[_index].retrieve();
    }
}
