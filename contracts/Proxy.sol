// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

contract Proxy{
  uint256 population;
  address implementationAddress = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0;

  fallback(bytes calldata data) external returns(bytes memory){
    (bool success, bytes memory result) = implementationAddress.delegatecall(data);
    require(success, "Delegatecall failed");
    return result;
  }
}