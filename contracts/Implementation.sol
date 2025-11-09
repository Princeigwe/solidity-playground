// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

contract Implementation{
  uint256 population;

  event Population(uint256 population);


  function incrementPopulation() public {
    population++;
  }

  function getPopulation() public view returns (uint256) {
    return population;
  }

}