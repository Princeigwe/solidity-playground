export const implementationV2Abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "population",
          "type": "uint256"
        }
      ],
      "name": "Population",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getPopulation",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "incrementPopulation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "multiplyPopulationBy2",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]