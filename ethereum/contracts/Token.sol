pragma solidity ^0.4.0;

contract Token {
    bytes32 json_token;


    function Token(bytes32 token){
        json_token = token;
    }
    function getJsonToken() constant returns (bytes32) {
        return json_token;
    }

}
