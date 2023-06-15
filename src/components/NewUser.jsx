import React, { useState } from 'react';

const NewUser = (props) => {

  const { idContract, signer, checkNewUser } = props;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [pan, setPan] = useState('');

  const connectedUser = sessionStorage.getItem('connectedUser');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (aadhar.length !== 12) {
        alert('Aadhar number should be 12 digits long');
        return;
      }
      if (pan.length !== 10) {
        alert('PAN number should be 10 characters long');
        return;
      }
      const tx = await idContract.connect(signer).addDetails(connectedUser, name, phone, aadhar, pan.toUpperCase());
      alert('Transaction hash: ' + tx.hash);
      await tx.wait();
      alert('User Registered');

      const isNewUser = await idContract.isNew(connectedUser);
      checkNewUser(isNewUser);

      window.location.reload(); // reload the page after registering the user
    } catch (error) {
      console.error('Error registering new user:', error);
      alert('Error registering new user: ' + error.message);
    }
  };


  const handlePanChange = (e) => {
    setPan(e.target.value.toUpperCase());
  };



  return (
    <div className='registerFormContainer'>
      <form className="registerForm" onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Aadhar:
          <input type='number' value={aadhar} onChange={(e) => setAadhar(e.target.value)} required />
        </label>
        <label>
          PAN:
          <input type='text' value={pan} onChange={handlePanChange} required />
        </label>
        <button className='registerButton' type='submit'>Confirm!</button>
      </form>
    </div>
  );
};

export default NewUser;
