pragma solidity ^0.4.0;

contract Service {

  bytes32 public public_key;

  function Service(bytes32 new_public_key) {
    public_key = new_public_key;
  }
  function getPublicKey() constant returns (bytes32){
    return public_key;
  }

}
