pragma solidity ^0.4.0;

contract Token {
    string json_token;


    function Token(string token){
        json_token = token;
    }
    function getJsonToken() constant returns (string) {
        return json_token;
    }

}
