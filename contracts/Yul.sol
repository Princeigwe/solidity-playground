// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;



contract Yul {
  uint8 internal smalluint;

  function yulFunction() pure public {
    assembly{
      let x := 5
      let y
      y := 10
    }
  }

  function storeUint8() public{
    assembly{
      sstore(0x00, 0x10)
    }
  }

  function getUint8()view public returns(uint8) {
    uint8 value;
    assembly{
      value := sload(0x00)
    }
    return value;
  }

  // function getUint8Example() view public returns(bytes32){
  //   assembly{
  //     let value := sload(0x00)
  //     mstore(0x80, value)
  //     return(0x80, 0x20)
  //   }
  // }
}
