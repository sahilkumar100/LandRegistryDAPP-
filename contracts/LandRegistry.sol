// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {

    struct Land {
        uint256 id;
        string name;
        address owner;
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCount;

    event LandRegistered(uint256 id, string name, address owner);

    function registerLand(string memory _name) public {
        landCount++;
        lands[landCount] = Land(landCount, _name, msg.sender);

        emit LandRegistered(landCount, _name, msg.sender);
    }

    function getLandOwner(uint256 _id) public view returns (address) {
        return lands[_id].owner;
    }
}
