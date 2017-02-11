pragma solidity ^0.4.0;

contract Identity {

  address public owner;

  function Identity() {
    owner = msg.sender;
  }

  // Public keys system
  bytes32[] public public_keys;

  function getPublicKeys() constant returns (bytes32[] keys){
    return public_keys;
  }

  function addPublicKey(bytes32 new_key) returns (bool) {
    if(owner == msg.sender){
        return false;
    }
    public_keys.push(new_key);
  }


  // Tokens
  address[] tokens;
  function getTokens() constant returns (address[]){
    return tokens;
  }
  function addToken(address new_key) returns (bool) {
    if(owner == msg.sender){
        return false;
    }
    tokens.push(new_key);
    return true;

  }

}
