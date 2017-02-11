pragma solidity ^0.4.8;
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Identity.sol";

contract TestMetacoin {

  function testInitialBalanceWithNewMetaCoin() {
    Identity id = new Identity("private key");


    Assert.equal(id.creator, tx.origin, "Owner should have 10000 MetaCoin initially");
  }
}