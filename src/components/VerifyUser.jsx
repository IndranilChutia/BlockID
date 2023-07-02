import React, { useState } from 'react';
import idABI from '../contracts/idABI.json'
import { ethers } from 'ethers';

import GithubButton from './GithubButton';


const VerifyUser = (props) => {
    const { provider } = props;
    const [uniqueId, setUniqueID] = useState('');
    const [isVerified, setVerified] = useState(null);
    const [userName, setUserName] = useState('');
    const [verifiedStatus, setVerifiedStatus] = useState('');

    const ABI = idABI;

    const contractAddress = "0xa7C40FeC4210c5AE45AB81F5ad7802d73a944f2c";


    // The Contract object
    const idContract = new ethers.Contract(contractAddress, ABI, provider);

    const handleVerifySubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("Running")
            const result = await idContract.isVerified(uniqueId);
            setVerified(result);
            setVerifiedStatus(result ? 'Verified! ✅' : 'Not Verified! ❌');

            if (result) {
                const name = await idContract.showName(uniqueId);
                setUserName(name);
            } else {
                setUserName('');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    }

    return (
        <div className='verifyUserContainer'>
            <h1 className='verifyUserTitle'>Verify User</h1>
            <p>Enter user's Unique Address to check if the user is verified or not!</p>

            <div className="userInfoContainer">

                {isVerified ? <div className="userVerifiedCircle">
                    <div className="tickMark"></div>
                </div> : <div className="userNotVerifiedCircle"></div>}

                <form className="verifyUserForm" onSubmit={handleVerifySubmit}>
                    <label className='uniqueID-label'>UniqueID:
                        <input type="text" value={uniqueId} onChange={(e) => setUniqueID(e.target.value)} required />
                    </label>

                    <button className='checkUserButton'>Check User</button>
                </form>

                <div className="statusContainer">
                    <p className='statusTitle'>Status: <span style={{ color: isVerified ? 'green' : 'red' }}>{verifiedStatus}</span></p>
                    <p className='userName-verify'>Name: {userName}</p>
                </div>


            </div>
            
            <div className='github_container'>
                <GithubButton />
            </div>    
        </div>
    );
};

export default VerifyUser;
