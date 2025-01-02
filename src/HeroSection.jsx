import React, { useState } from 'react';
import {shortUrlFun} from './Services/apiService.js';
function HeroSection(){
    const [actualurl, setActualUrl] = useState("");
    const [shortedUrl, setShortedUrl] = useState("");

    const copyFunction = ()=>{
        navigator.clipboard.writeText(shortedUrl)
        .then(()=>{
            alert("Url copied to clipboard");
        })
        .catch((err)=>{
           console.error("Error copying to clipboard"+err);
           alert("Failed to copy Url.");
        })
    }
    const shortUrl = async (event)=>{

        // Stop the form to submit after clicking on submit button.
        event.preventDefault();
        console.log(actualurl);
 
        try{
             // Getting shorted form of url by frontend Api <--> backend Api.
            const shortform = await shortUrlFun(actualurl);
            setShortedUrl(shortform); 
            console.log(shortedUrl);
            setActualUrl("");

            // Again setting the shorted url to empty after 10sec.
            setTimeout(()=>{
                setShortedUrl("");
            }, 8000)
        }
        catch(err){
            console.log(`some error in shorting ${err}`);
        }

    }
    return(
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-lg border p-4 m-6 bg-gray-800 h-64">
            <form className="max-w-sm mx-auto mb-4" onSubmit={shortUrl}>
                <div className="mb-5">
                    <label htmlFor="actualUrl" className="block mb-2 text-sm font-medium text-white dark:text-white">Your Url</label>
                    <input type="url" id="actualUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required value={actualurl} onChange={(e)=> setActualUrl(e.target.value)}/>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Shorten</button>
            </form>

            <hr />
            {shortedUrl && 
                 <div className="max-w-sm mx-auto mt-4">
                    <p>Shorted Url: <a href={shortedUrl} target='_blank' className='text-blue-400 mr-4'>{shortedUrl}</a>  <i className='fa-regular fa-copy hover:text-blue-500 cursor-pointer' onClick={copyFunction}></i></p>
                </div>
            }
        </div>
    )
}
export default HeroSection;