// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

contract Proxy{
  uint256 population;
  address implementationAddress;
  address owner;

  constructor(address _owner){
    owner = _owner;
  }

  modifier onlyOwner(){
    require(owner == msg.sender, "Not contract owner");
    _;
  }

  function setImplementation(address _implementationAddress) public onlyOwner{
    implementationAddress = _implementationAddress;
  }

  fallback(bytes calldata data) external returns(bytes memory){
    (bool success, bytes memory result) = implementationAddress.delegatecall(data);
    require(success, "Delegatecall failed");
    return result;
  }
}