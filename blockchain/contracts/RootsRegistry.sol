// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RootsRegistry
 * @dev Stores family tree metadata and IPFS hashes on-chain
 */
contract RootsRegistry is Ownable {
    struct PersonRecord {
        string ipfsHash;        // IPFS hash of person data
        address creator;        // Who created this record
        uint256 createdAt;      // Timestamp
        bool exists;            // Record existence flag
    }

    struct MemoryRecord {
        string ipfsHash;        // IPFS hash of memory data
        string personId;        // Associated person ID
        address creator;        // Who created this memory
        uint256 createdAt;      // Timestamp
        bool exists;            // Record existence flag
    }

    // Mappings
    mapping(string => PersonRecord) public persons;
    mapping(string => MemoryRecord) public memories;
    mapping(address => string[]) public userPersons;
    mapping(address => string[]) public userMemories;

    // Events
    event PersonRegistered(
        string indexed personId,
        string ipfsHash,
        address indexed creator,
        uint256 timestamp
    );

    event MemoryRegistered(
        string indexed memoryId,
        string indexed personId,
        string ipfsHash,
        address indexed creator,
        uint256 timestamp
    );

    event PersonUpdated(
        string indexed personId,
        string newIpfsHash,
        uint256 timestamp
    );

    event MemoryUpdated(
        string indexed memoryId,
        string newIpfsHash,
        uint256 timestamp
    );

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Register a new person record
     */
    function registerPerson(
        string memory personId,
        string memory ipfsHash
    ) external {
        require(!persons[personId].exists, "Person already exists");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        persons[personId] = PersonRecord({
            ipfsHash: ipfsHash,
            creator: msg.sender,
            createdAt: block.timestamp,
            exists: true
        });

        userPersons[msg.sender].push(personId);

        emit PersonRegistered(personId, ipfsHash, msg.sender, block.timestamp);
    }

    /**
     * @dev Register a new memory record
     */
    function registerMemory(
        string memory memoryId,
        string memory personId,
        string memory ipfsHash
    ) external {
        require(!memories[memoryId].exists, "Memory already exists");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        memories[memoryId] = MemoryRecord({
            ipfsHash: ipfsHash,
            personId: personId,
            creator: msg.sender,
            createdAt: block.timestamp,
            exists: true
        });

        userMemories[msg.sender].push(memoryId);

        emit MemoryRegistered(
            memoryId,
            personId,
            ipfsHash,
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @dev Update person IPFS hash (only by creator)
     */
    function updatePerson(
        string memory personId,
        string memory newIpfsHash
    ) external {
        require(persons[personId].exists, "Person does not exist");
        require(
            persons[personId].creator == msg.sender,
            "Only creator can update"
        );
        require(bytes(newIpfsHash).length > 0, "IPFS hash cannot be empty");

        persons[personId].ipfsHash = newIpfsHash;

        emit PersonUpdated(personId, newIpfsHash, block.timestamp);
    }

    /**
     * @dev Update memory IPFS hash (only by creator)
     */
    function updateMemory(
        string memory memoryId,
        string memory newIpfsHash
    ) external {
        require(memories[memoryId].exists, "Memory does not exist");
        require(
            memories[memoryId].creator == msg.sender,
            "Only creator can update"
        );
        require(bytes(newIpfsHash).length > 0, "IPFS hash cannot be empty");

        memories[memoryId].ipfsHash = newIpfsHash;

        emit MemoryUpdated(memoryId, newIpfsHash, block.timestamp);
    }

    /**
     * @dev Get person record
     */
    function getPerson(string memory personId)
        external
        view
        returns (PersonRecord memory)
    {
        require(persons[personId].exists, "Person does not exist");
        return persons[personId];
    }

    /**
     * @dev Get memory record
     */
    function getMemory(string memory memoryId)
        external
        view
        returns (MemoryRecord memory)
    {
        require(memories[memoryId].exists, "Memory does not exist");
        return memories[memoryId];
    }

    /**
     * @dev Get all persons created by a user
     */
    function getUserPersons(address user)
        external
        view
        returns (string[] memory)
    {
        return userPersons[user];
    }

    /**
     * @dev Get all memories created by a user
     */
    function getUserMemories(address user)
        external
        view
        returns (string[] memory)
    {
        return userMemories[user];
    }
}
