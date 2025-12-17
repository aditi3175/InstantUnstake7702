// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IStaking {
    function unstake(address user) external;
    function getUnlockTime(address user) external view returns (uint256);
}

contract SmartAccount7702 {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Delegated unstake execution
    function delegatedUnstake(address stakingContract) external onlyOwner {
        IStaking staking = IStaking(stakingContract);

        uint256 unlockTime = staking.getUnlockTime(owner);
        require(block.timestamp >= unlockTime, "Not eligible yet");

        // atomic unstake
        staking.unstake(owner);
    }
}
