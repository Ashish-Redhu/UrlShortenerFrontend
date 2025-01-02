import React from 'react'
import './Popup.css'
export default function Popup({popup, setPopup }) {
    function togglePopup(){
        setPopup(!popup);
    }
  return (
    <div>
        <div className="background" onClick={togglePopup}>            
            <div className="form w-10/12 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"  onClick="return false;">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Unlock Custom URL for Just $1!</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Enhance your link by customizing it to match your brand or personal style. For only $1, make your URL unique and memorable!</p>
                <hr />
                <a href="#" className="inline-flex items-center text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2" onClick="return false;">
                    Click to pay
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>

        </div>
        
    </div>
  )
}
