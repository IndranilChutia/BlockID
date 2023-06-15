import React, { useEffect, useState } from 'react';

const ExistingUser = (props) => {
  const { idContract, checkNewUser } = props;

  const [userName, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [pan, setPan] = useState('');

  const connectedUser = sessionStorage.getItem('connectedUser');

  const userDetails = async () => {
    try {
      const userDetails = await idContract.viewDetails(connectedUser);
      setName(userDetails[0]);
      setPhone(userDetails[1].toString());
      setAadhar(userDetails[2].toString());
      setPan(userDetails[3]);

      console.log('User Details: ', userDetails.Name);
    } catch (error) {
      console.error('Error fetching user details: ', error);
    }
  };

  useEffect(() => {
    userDetails();
  }, []);

  const handleUpdate = () => {
    checkNewUser(true);
  };

  const UserDetails = () => (
    <div className="ExistingUserContainer">
      <h2>Name: {userName}</h2>
      <h2>Phone: {phone}</h2>
      <h2>Aadhar: {aadhar}</h2>
      <h2>PAN: {pan}</h2>
      <button className="refreshDataButton" onClick={userDetails}>
        Refresh Data
      </button>
      <button className="updateDataButton" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );

  return <UserDetails />;
};

export default ExistingUser;
