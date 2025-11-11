export const proxyAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "stateMutability": "nonpayable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_implementationAddress",
          "type": "address"
        }
      ],
      "name": "setImplementation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]