import React, { useState } from 'react';
import { customizeUrlFun } from './Services/apiService.js';
import ErrorPopup from './ErrorPopup'; // Assuming you're using a custom ErrorPopup component
function HeroCustomization() {
    const [actualurl, setActualUrl] = useState("");
    const [customString, setCustomString] = useState("");
    const [customizedUrl, setCustomizedUrl] = useState("");

    // To show error message while string customization. 
    const [message, setMessage] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);


    const copyFunction = () => {
        navigator.clipboard.writeText(customizedUrl)
            .then(() => {
                alert("URL copied to clipboard");
            })
            .catch((err) => {
                console.error("Error copying to clipboard: " + err);
                alert("Failed to copy URL.");
            });
    };

    const cutomizeUrl = async (event) => {
        event.preventDefault();
        console.log({ actualurl, customString });

        try {
            // Getting shortened form of URL by frontend API <--> backend API.
            const customizedFormat = await customizeUrlFun({actualurl, customString}); // Pass both actual URL and custom string
            setCustomizedUrl(customizedFormat);
            setActualUrl("");
            setCustomString("");

            // Clear the shortened URL after 8 seconds.
            setTimeout(() => {
                setCustomizedUrl("");
            }, 8000);
        } catch (err) {
          // Inside err the message is present but not directly. Still to access that we have to use err.message;
           setMessage(err.message);
           setShowErrorPopup(true);
           setTimeout(() => {
               setShowErrorPopup(false); // Hide error popup after 5 seconds
            }, 5000);
        }
    };

    return (
        <div className='w-full flex flex-col items-center'>
            {showErrorPopup && <ErrorPopup tempmsg={message} onClose={() => setShowErrorPopup(false)} />} {/* Show error message */}
            <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-lg border p-4 m-6 bg-gray-800 h-80">
                <form className="max-w-sm mx-auto mb-4" onSubmit={cutomizeUrl}>
                    <div className="mb-5">
                        <label htmlFor="actualUrl" className="block mb-2 text-sm font-medium text-white">Your URL</label>
                        <input
                            type="url"
                            id="actualUrl"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your URL"
                            required
                            value={actualurl}
                            onChange={(e) => setActualUrl(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="customString" className="block mb-2 text-sm font-medium text-white">Custom String (Optional)</label>
                        <input
                            type="text"
                            id="customString"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter custom string"
                            value={customString}
                            required
                            onChange={(e) => setCustomString(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Shorten</button>
                </form>

                <hr />
                {customizedUrl &&
                    <div className="max-w-sm mx-auto mt-4">
                        <p>Your Cutomized URL: <a href={customizedUrl} target='_blank' rel="noopener noreferrer" className='text-blue-400 mr-4'>{customizedUrl}</a>
                            <i className='fa-regular fa-copy hover:text-blue-500 cursor-pointer' onClick={copyFunction}></i>
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default HeroCustomization;
