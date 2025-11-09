// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

contract Proxy{
  uint256 population;
  address implementationAddress = 0x0165878A594ca255338adfa4d48449f69242Eb8F;

  fallback(bytes calldata data) external returns(bytes memory){
    (bool success, bytes memory result) = implementationAddress.delegatecall(data);
    require(success, "Delegatecall failed");
    return result;
  }
}