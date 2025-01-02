// Tailwind CSS form + React Hook form concepts.
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { newUserRegistration } from './Services/apiService';
import ErrorPopup from './ErrorPopup';
function Register({registerv, setRegister, setShowSuccessPopup, setUserDetails}){

    // Remember the below thing has nothing to do with our componenet name "Register";
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }  } = useForm(); // These are react-hook-properties. // register is used to find input fields with react-hook-form.
    // watch: For real time lookup.
    // isSubmitting: Check if form is in submitting state currently.
    const [showErrorPopup, setShowErrorPopup] = useState(false); // State to show popup
    const [message, setMessage] = useState("");

    function toggleRegister(){
        setRegister(!registerv);
    }
    const handleRegister = async(data)=>{
        const newUser = await newUserRegistration(data);
        if(newUser.check===true){
            // The below one is to show user profile after successful registration.
            setUserDetails({
                name: newUser.response.name,
                email: newUser.response.email,
                walletMoney: newUser.response.walletMoney,
            });
            toggleRegister(); // successful user registration.
            setShowSuccessPopup(true);
            setTimeout(()=>{
                setShowSuccessPopup(false);
            }, 2000);
        }
        else{
            const tempmsg = newUser.error.response.data.message;
            setMessage(tempmsg);
            setShowErrorPopup(true); // Show error popup 
            setTimeout(()=>{
               setShowErrorPopup(false);
            },5000);      // We are doing this so that the popup become unvisible after a few seconds.  
        }
    }
    return(
        <div>
        <div className="background" onClick={toggleRegister}>
        {showErrorPopup && <ErrorPopup tempmsg={message}  onClose={() => setShowErrorPopup(false)}/>} {/* Display the error message */}
            <form className="form w-10/12 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onSubmit={handleSubmit(handleRegister)} onClick={(e) => e.stopPropagation()}>

                {/* <!-- Close Button --> */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none text-[1.5rem]"
                    onClick={toggleRegister}
                >
                    &times;
                </button>
                <h2 className="relative z-0 w-full mb-5 group text-3xl">Registration Form</h2>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text"
                        {...register("name", 
                            {  
                                required: "Name is required", 
                                minLength:{value:3, message: 'Min len atleast 3'},
                                maxLength: {value:15, message: 'Max len atmax 15'}
                            })} 
                        name="name" 
                        id="name" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" 
                        {...register("email", { required: true })}
                        name="email" 
                        id="email" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" 
                       {...register("password", { 
                        required: "Password is required",
                        validate: {
                            strongPassword: (value) => 
                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) 
                                || "Password must contain at least 8 characters, one letter, one number, and one special character"
                        }
                       })} 
                        name="password" 
                        id="password" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* The real time tracking of confirm-password is possible because of "watch" */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" 
                        {...register("confirm_password", { 
                            required: "Please confirm your password",
                            validate: (value) => value === watch("password") || "Passwords do not match"
                        })}
                        name="confirm_password" 
                        id="confirm_password" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="confirm_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={isSubmitting} 
                > {isSubmitting ? "Submitting..." : "Register"}</button>
            </form>
        </div>
        </div>
    )
}

export default Register;
