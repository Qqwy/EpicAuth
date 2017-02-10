pragma solidity ^0.4.0;

contract Identity {

  string[] public pubkeys;
  address public creator;

  function Identity(string first_pubkey) {
    pubkeys.push(first_pubkey);
    creator = msg.sender;
  }
}
