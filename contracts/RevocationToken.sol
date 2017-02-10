pragma solidity ^0.4.0;

contract RevocationToken {
  address[] signatures;

  function RevocationToken() {
    signatures.push(msg.sender);
  }

  function getSignatures() returns (address[]) {
  	if(signatures[0] == msg.sender) {
  		return signatures;
  	} else {
  		throw;
  	}
  }
}
