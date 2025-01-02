import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from './Services/apiService'; // Your API call to handle login
import ErrorPopup from './ErrorPopup'; // Assuming you're using a custom ErrorPopup component

function Login({ login, setLogin, setRegister, setShowLoginSuccessPopup, setUserDetails}) {
    // React Hook Form setup
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
    
    // States for error popup
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [message, setMessage] = useState("");

    // Toggle login modal visibility
    function toggleLogin() {
        setLogin(!login);
    }
    
    // Function to close login form and open register form.
    function DonotHaveAccount(){
        setLogin(!login);
        setRegister(true);
    }

    // Handle form submission
    const handleLogin = async (data) => {
        const user = await loginUser(data);
        if (user.check === true) {
            setUserDetails({
                name: user.response.name,
                email: user.response.email,
                walletMoney: user.response.walletMoney,
                type: user.response.type
            });

            toggleLogin(); // Close the login modal on success
            setShowLoginSuccessPopup(true); // to show popup after successfull login.
            setTimeout(() => {
                setShowLoginSuccessPopup(false); // Hide success popup after 2 seconds
            }, 2000);
        } else {
            const tempmsg = user.error?.response?.data?.message || "An error occured. Please try again";
            setMessage(tempmsg);
            setShowErrorPopup(true); // Show error popup
            setTimeout(() => {
                setShowErrorPopup(false); // Hide error popup after 5 seconds
            }, 5000);
        }
    };

    return (
        <div>
            <div className="background" onClick={toggleLogin}>
                {showErrorPopup && <ErrorPopup tempmsg={message} onClose={() => setShowErrorPopup(false)} />} {/* Show error message */}
                <form 
                    className="form w-10/12 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" 
                    onSubmit={handleSubmit(handleLogin)} 
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none text-[1.5rem]"
                        onClick={toggleLogin}
                    >
                        &times;
                    </button>
                    <h2 className="relative z-0 w-full mb-5 group text-3xl">Login Form</h2>

                    {/* Email Field */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input 
                            type="email" 
                            id="email" 
                            {...register("email", { required: "Email is required" })} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="name@flowbite.com" 
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input 
                            type="password" 
                            id="password" 
                            {...register("password", { 
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                    <div style={{ margin: "0.5rem", color: "rgb(79,144,219)" }}>Or</div>
                    <p style={{color: "rgb(79,144,219)",  textDecoration: "underline", cursor: "pointer"}} onClick={DonotHaveAccount}>Don't have an account</p>
                </form>
                
                {/* <p><a class="link-opacity-75" href="/signup">Don't have an account</a></p> */}
            </div>
        </div>
    );
}

export default Login;
