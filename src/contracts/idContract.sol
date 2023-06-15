// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract ID{
    struct idStruct{
        string Name;
        uint Phone;
        uint Aadhar;
        string PAN;
    }

    mapping(address => idStruct) public idMap;

    function addDetails(address _Address, string memory _Name, uint _Phone, uint _Aadhar, string memory _PAN) public{
        address sender = _Address;
        idMap[sender]=idStruct(_Name, _Phone, _Aadhar, _PAN);
    }

    function viewDetails(address _Address) public view returns(idStruct memory){
        return idMap[_Address];
    }


    function isVerified(address _Address) public view returns(bool)
    {
        if (bytes(idMap[_Address].PAN).length < 10 || idMap[_Address].Aadhar == 0) {
            return false;
        } 

        return true;
    }

    function isNew(address _Address) public view returns(bool){
        if (bytes(idMap[_Address].Name).length==0){
            return true;
        }

        return false;
    }

    function showName(address _Address) public view returns(string memory){
        return idMap[_Address].Name;
    }
}