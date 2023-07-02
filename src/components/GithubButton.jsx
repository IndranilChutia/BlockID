import React from 'react';
import githubLogo from '../assets/github.png';

const GithubButton = () => {
    return (
            <button 
                type="button" 
                onClick={()=> window.open('https://github.com/IndranilChutia/Blockchain_IdSystem')}
                className='github_button'>
                    <img src={githubLogo} alt="github_logo" className='github_logo'/>
                    Github
            </button>
    );
};

export default GithubButton;