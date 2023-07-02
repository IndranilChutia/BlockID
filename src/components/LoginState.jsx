import { ethers } from 'ethers';
import idABI from '../contracts/idABI.json';
import { useState, useEffect } from 'react';

const LoginState = (props) => {

  const {provider, signer, onConnection, checkNewUser} = props;

    const ABI = idABI;

    const contractAddress = "0x37A42AD6396B6182ef3Ac0AaBEf46668C1b470C9";

  // The Contract object
    const idContract = new ethers.Contract(contractAddress, ABI, provider);

    const connectWallet = async () => {
      try {
        await window.ethereum?.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
    
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
    
        sessionStorage.setItem('connectedUser', userAddress);
        onConnection(true);
        sessionStorage.setItem('isConnected', 'true');

        const connectedUser = sessionStorage.getItem('connectedUser');
    
        // Call the isNew function from the contract and store the result in checkNewUser
        const isNewUser = await idContract.isNew(connectedUser);
        checkNewUser(isNewUser);
    
        console.log(isNewUser);
    
        console.log(sessionStorage.getItem('connectedUser'))
      } catch (err) {
        console.log(err);
      }
    };
    

    useEffect(() => {
      connectWallet();
    }, []);

  return (
    <div className="login-prompt-container">
      <h2 className="loginPromptText">Please Login to Continue</h2>
      <div className="loginBox">
        <p className="login-text">Connect Wallet</p>
        <button className="connect-wallet-button" onClick={connectWallet}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default LoginState;
