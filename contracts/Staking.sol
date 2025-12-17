// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    IERC20 public token;

    uint256 public constant LOCK_TIME = 10; // TEMP for testing
    struct StakeInfo {
        uint256 amount;
        uint256 unlockTime;
    }

    mapping(address => StakeInfo) public stakes;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        require(stakes[msg.sender].amount == 0, "Already staked");

        token.transferFrom(msg.sender, address(this), amount);

        stakes[msg.sender] = StakeInfo({
            amount: amount,
            unlockTime: block.timestamp + LOCK_TIME
        });
    }

    function unstake(address user) external {
        StakeInfo memory info = stakes[user];
        require(info.amount > 0, "Nothing staked");
        require(block.timestamp >= info.unlockTime, "Lock not expired");

        delete stakes[user];
        token.transfer(user, info.amount);
    }

    function getUnlockTime(address user) external view returns (uint256) {
        return stakes[user].unlockTime;
    }
}
