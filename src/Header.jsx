import React, { useState, useEffect } from 'react';
import profilePic from './profile-user.png';
import ProfileCard from './ProfileCard';
import Cookies from 'js-cookie';
import { verifyToken } from './Services/apiService';

export default function ({ setPopup, setRegister, setLogin, userDetails, setUserDetails, setShowLoginSuccessPopup}) {
  function togglePopup() {
    setPopup(true);
  }

  function registerForm() {
    setRegister(true);
  }

  function loginForm() {
    setLogin(true);
  }

  const [profileCard, setProfileCard] = useState(false);

  const toggleProfileCard = () => {
    setProfileCard(!profileCard);
  };

  useEffect(()=>{
    // Check for token in cookies
    const token = Cookies.get("token");
    if(token)
    {
       verifyToken().then((data)=>{
         if(data){
            setUserDetails(data.user);
         }
         else{
          console.warn("Token verification failed");
         }
      });
    }
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Shrink
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <a
                href="#"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                onClick={togglePopup}
              >
                Customization
              </a>

              {userDetails ? (
                <div>
                  <img
                    src={profilePic}
                    alt={'userProfile'}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={toggleProfileCard}
                  />
                  {profileCard && (
                    <div className="profile-card-overlay">
                      <ProfileCard
                        userDetails={userDetails}
                        closeProfileCard={() => setProfileCard(false)}
                        setUserDetails={setUserDetails}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <a
                    href="#"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2.5 lg:px-2.5 py-2 lg:py-2.5 mr-0 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    onClick={loginForm}
                  >
                    Login
                  </a>
                  <span>/</span>
                  <a
                    href="#"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2.5 lg:px-2.5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    onClick={registerForm}
                  >
                    Register
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* ProfileCard Overlay - Hidden until triggered */}
      {profileCard && (
        <div className="profile-card-overlay">
          <ProfileCard
            userDetails={userDetails}
            closeProfileCard={() => setProfileCard(false)}
            setUserDetails={setUserDetails}
            setShowLoginSuccessPopup={setShowLoginSuccessPopup}
          />
        </div>
      )}
    </div>
  );
}
