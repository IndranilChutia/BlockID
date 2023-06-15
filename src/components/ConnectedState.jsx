import React, { useEffect } from 'react';
import idABI from '../contracts/idABI.json'
import ExistingUser from './ExistingUser'
import { ethers } from 'ethers';
import NewUser from './NewUser';

const ConnectedState = (props) => {


    const { provider, signer, isNewUser, checkNewUser } = props;

    const ABI = idABI;

    const contractAddress = "0xa7C40FeC4210c5AE45AB81F5ad7802d73a944f2c";


    // The Contract object
    const idContract = new ethers.Contract(contractAddress, ABI, provider);

    const connectedUser = sessionStorage.getItem('connectedUser');
    const getIsNewUser = async () => {
        const isNew = await idContract.isNew(connectedUser);
        checkNewUser(isNew);
        console.log(isNew)
    };

    const printNewUserStatus = async () => {
        console.log(isNewUser)
    }

    useEffect(() => {
        getIsNewUser();
    }, []);

    return (
        <div className='connectedStateContainer'>
            {isNewUser ? <NewUser signer={signer} checkNewUser={checkNewUser} idContract={idContract} /> : <ExistingUser checkNewUser={checkNewUser} idContract={idContract} />}
            {/* <button onClick={printNewUserStatus}>Click</button>s */}
        </div>
    );
};

export default ConnectedState;