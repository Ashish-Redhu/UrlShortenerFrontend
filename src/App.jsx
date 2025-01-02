import React, {useState, useEffect} from 'react'
import HeroSection from "./HeroSection"
import Header from "./Header"
import Popup from './Popup';
import Register from './Register';
import Login from './Login';
import SuccessPopup from './SuccessPopup';
import ErrorPopup from './ErrorPopup';
import HeroCustomization from './HeroCustomization';
function App() {

  // state to show customization popup.
  const [popup, setPopup] = useState(false);    

  // states to show login, register popup forms.
  const [registerv, setRegister] = useState(false);
  const [login, setLogin] = useState(false);


  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup on registration, (a simple strip.)
  const [showLoginSuccessPopup, setShowLoginSuccessPopup] = useState(false); // State for login success popup (a simple strip.)
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [userDetails, setUserDetails] = useState(null);  // To show user icon and details after login/Register.

  // If user is premium we will provide his customization feature.
  const isPremiumUser = userDetails?.type === "PremiumUser"; 


  useEffect(() => {
    // Check if the flag is set in localStorage
    const popupFlag = localStorage.getItem('showErrorPopup');

    if (popupFlag === 'true') {
      // Show the popup if the flag is present
      setShowErrorPopup(true);

      // Clear the flag from localStorage
      localStorage.removeItem('showErrorPopup');

      // Hide the popup after 2 seconds
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 2000);
    }
  }, []);


  return (
    <div>
      <Header setPopup={setPopup}  setRegister={setRegister} setLogin={setLogin} userDetails={userDetails} setUserDetails={setUserDetails} setShowErrorPopup={setShowErrorPopup}/>
      {/* This error popup will be visible after logout. */}
      {showErrorPopup && <ErrorPopup tempmsg="Logout Successful!" onClose={() => setShowErrorPopup(false)} /> } 

      {showSuccessPopup && <SuccessPopup message={"Registration Successful!"}/>}
      {showLoginSuccessPopup && <SuccessPopup message={"Login Successful!"}/>}
      {/* Conditionally render either HeroSection or HeroCustomization */}
      <div className="flex-grow flex items-center justify-center">
     
        {userDetails && isPremiumUser ? 
          
          <HeroCustomization/>
          :
          <HeroSection/>
          
        }
      </div>
      
      {
        popup ? <Popup popup={popup} setPopup={setPopup}/> : null
      }
      {
        registerv ? <Register registerv={registerv} setRegister={setRegister} setShowSuccessPopup={setShowSuccessPopup} setUserDetails={setUserDetails}/> : null
      }
      {
        login ? <Login login={login} setLogin={setLogin} setRegister={setRegister} setShowLoginSuccessPopup={setShowLoginSuccessPopup} setUserDetails={setUserDetails}/> : null
      }
    </div>
  )
}

export default App
