import React, { useState } from 'react';
import { updateWalletMoney, logoutUser } from './Services/apiService';
import './styles.css'; // Import CSS for overlay styling

function ProfileCard({ userDetails, closeProfileCard, setUserDetails, setShowLoginSuccessPopup}) {
  const [addMoney, setAddMoney] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMoney = async () => {
    if (!addMoney || isNaN(addMoney) || addMoney <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    setIsAdding(true);
    try {
        // console.log(`:::::::::: ProfileCard :::::::::::: Email is: ${userDetails.email}`)
        const updatedDetails = await updateWalletMoney({ email: userDetails.email, amount: addMoney });
        // console.log("Inside React component is: ");
        // console.log(updatedDetails);
        setUserDetails((prev)=>({
            ...prev,
            walletMoney: updatedDetails.walletMoney,
          }));
          console.log(updatedDetails);
        alert(`${addMoney} added to your wallet!`);
        setAddMoney('');
    } catch (error) {
      console.error('Error adding money:', error);
      alert('Failed to add money.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleLogout = async()=>{
    try {
      // Perform logout
      logoutUser();
    
      // Clear user details
      setUserDetails({});
     
      // Store the flag in localStorage to show the popup after reload
      localStorage.setItem('showErrorPopup', 'true');         // This popup will show after page reload with the help of useEffect in App.jsx;
    
      // Refresh the page
      window.location.reload();
    } catch (err) {
      console.log('Error during logout:', err);
    }
    

  }


  return (
    <>
      {/* Fullscreen overlay */}
      <div className="profile-card-overlay" onClick={closeProfileCard}>
        <div
          className="profile-card-container"
          onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing the modal when clicking inside
        >
          <button className="absolute top-1 right-2 text-gray-500 hover:text-indigo-900 hover:scale-110 focus:outline-none text-[1.5rem]"
                  onClick={closeProfileCard}
          >&times;
          </button>
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Wallet Balance:</strong> ${userDetails.walletMoney}</p>
          <hr className="my-2" />
          <div className="mt-2">
            <label className="block mb-1 text-sm">Add Money to Wallet</label>
            <input
              type="number"
              value={addMoney}
              onChange={(e) => setAddMoney(Number(e.target.value))}
              className="w-full p-2 rounded-lg text-gray-900"
              placeholder="Enter amount"
            />
            <button
              onClick={handleAddMoney}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
              disabled={isAdding}
            >
              {isAdding ? 'Adding...' : 'Add Money'}
            </button>
          </div>
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
