pragma solidity ^0.4.0;
contract TestContract {
    address public me;
    function TestContract() {
        me = msg.sender;
    }
    function getMe() returns (address){
        return me;
    }

}