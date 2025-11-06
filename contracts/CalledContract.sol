// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

contract CalledContract{
  uint256 population;

  function incrementPopulation() public{
    population ++;
  }

  function getPopulation() view public returns(uint256){
    return population;
  }
}