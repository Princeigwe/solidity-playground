// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

contract ImplementationV2{
  uint256 population;

  event Population(uint256 population);

  function multiplyPopulationBy2()public{
    population = population * 2;
  }

  function incrementPopulation() public {
    population++;
  }

  function getPopulation() public view returns (uint256) {
    return population;
  }


}