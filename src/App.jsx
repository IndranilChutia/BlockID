import { useState, useEffect } from 'react';
import { ethers } from "ethers";

import './App.css';
import LoginState from './components/LoginState';
import ConnectedState from './components/ConnectedState';
import VerifyUser from './components/VerifyUser';

import Logo from './assets/white_logo_full.png'
import GithubButton from './components/GithubButton';

function App() {

  const [isConnected, setConnected] = useState(false);
  const [isNewUser, setNewUser] = useState(null);

  const [walletAvailable, setWalletAvailable] = useState(false);

  useEffect(() => {
    const storedIsConnected = sessionStorage.getItem('isConnected');
    if (storedIsConnected === 'true') {
      setConnected(true);
    }
  }, []);

  const handleConnection = (isConnected) => {
    setConnected(isConnected);
  };

  const handleNewUser = (isNewUser) => {
    setNewUser(isNewUser);
  }


  useEffect(() => {
    if (window.ethereum) {
      setWalletAvailable(true)
    }
  }, [])

  if (walletAvailable) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    return (
      <div className="App">
        <div className="main">

          <div className="hero">
            <div className="left">
              <div className="name-photo-container">
                <div className="profileCircle"><img src={Logo} alt="" /></div>
                <div className="profileNameAddressContainer">
                  <h1 className='profileName'>Welcome to BlockID (Sepolia Testnet)</h1>
                  <p className='profileNameWalletAddress'>UniqueID: {sessionStorage.getItem('connectedUser')}</p>
                </div>

              </div>
              {isConnected ? <ConnectedState provider={provider} signer={signer} checkNewUser={handleNewUser} isNewUser={isNewUser} /> : <LoginState onConnection={handleConnection} checkNewUser={handleNewUser} provider={provider} signer={signer} />}
            </div>
            <div className="right">
              <VerifyUser provider={provider} />
            </div>
          </div>

        </div>

      </div>
    );

  } else {
    return (
      <div className="App">
        <div className="main">

          <div className="hero">
            <div className="left">
              <div className="name-photo-container">
                <div className="profileCircle"><img src={Logo} alt="" /></div>
                <div className="profileNameAddressContainer">
                  <h1 className='profileName'>Welcome to BlockID (Sepolia Testnet)</h1>
                  <p className='profileNameWalletAddress'>UniqueID: {sessionStorage.getItem('connectedUser')}</p>
                </div>

              </div>
              <div 
              style={{display:"flex", alignContent:"center", justifyContent:"center", cursor:"pointer"}}
              onClick={()=>{window.location.href = "https://metamask.io/";}}>
                <h1 style={{fontSize: "1.6rem", padding: "5%", backgroundColor:"#ffafbc", borderRadius: "20px"}}>Install Metamask</h1>
              </div>
  
            </div>
            <div className="right">
              
              <div style={{height: "100%", display: "flex", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
                <h3 style={{margin: "20px"}}>Check out this project on GitHub⬇️</h3>
                <GithubButton/>
              </div>
              
            </div>
          </div>

        </div>

      </div>
    );
  }


}

export default App;
