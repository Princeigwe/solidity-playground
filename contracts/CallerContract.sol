// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

contract CallerContract{
  address calledContractAddress = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512;

  function callIncrement() public returns(bool) {
    (bool success, ) = calledContractAddress.call(abi.encodeWithSignature('incrementPopulation()'));
    require(success, "Call failed");
    return success;
  }

  function callWrongFunction() public returns(bool){
    (bool success, )= calledContractAddress.call(abi.encodeWithSignature('nonExistingFunction()'));
    require(success, "Something went wrong with external call");
    return success;
  }

}