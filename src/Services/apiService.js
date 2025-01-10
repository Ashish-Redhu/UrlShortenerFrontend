import axios from "axios"
// axios will help to make http calls (frontend calls) to database (backend server >> database);

const backendProtoPlusHost = import.meta.env.VITE_BACKEND_PROTOPLUSHOST;
const backendPORT = import.meta.env.VITE_BACKEND_PORT;

// const backendURL = backendProtoPlusHost:backendPORT; // This will give error 
// const backendURL = `${backendProtoPlusHost}:${backendPORT}`;
const backendURL = import.meta.env.VITE_BACKEND_URL;


// 1.)
// To fetch shorted url from backend server.
export const shortUrlFun = async (largeUrl)=>{
    try{
        const shortedform = await axios.post(`${backendURL}/urls/shorten`, {value: largeUrl});
        return `${backendURL}/${shortedform.data}`;
    }
    catch(err){
        return {err};
    }
}

// 1.i) To fetch customized url from backend server.
export const customizeUrlFun = async ({actualurl, customString})=>{
    try{
        const customizedFormat = await axios.post(`${backendURL}/urls/customize`, {actualurl, customString});
        return `${backendURL}/${customizedFormat.data}`;
    }
    catch(err){
        // Remember it is necessary to throw and not return as the statement in HeroCustomization.jsx is using try-catch.
        // Extracting the error message and throwing it directly
        throw new Error(err.response?.data?.message || "Something went wrong while customizing the URL.");
        // Also, we can't throw the "err" directly because HeroCustomization will be unable to access it's reponse there. 
    }
    
}


// 2.) Registration form:
export const newUserRegistration = async(data)=>{
    try {
        const newUser = await axios.post(`${backendURL}/users/registerUser`, data);
        // console.log(newUser);
        return {response: newUser.data.data, check: true}
    } catch (error) {
        // console.error(error);
        return {error ,check: false};
    }
}

// 3.) Login form: 
export const loginUser = async(data)=>{
    try{
        const existingUser = await axios.post(`${backendURL}/users/loginUser`, data, { withCredentials: true }); // Ensure credentials are sent;
        console.log(existingUser.data);
        return {response: existingUser.data.data, check: true};
    }
    catch(error){
        return {error, check: false};
    }
}
// 3.i) Logout user:
export const logoutUser = async()=>{
    try {
        const response = await axios.post(
            `${backendURL}/users/logoutUser`,
            {},
            { withCredentials: true } // Ensure cookies are sent with the request
        );
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}

// 4.) Update wallet money.
export const updateWalletMoney = async({email, amount})=>{
    try{
        // console.log(`::::::: APIservice.js :::::::::: --> Email is: ${email} and amount is: ${amount}`);

        console.log(typeof amount, amount);
        const response = await axios.post(`${backendURL}/users/updateWallet`, {email, amount});
        //  console.log("HELLO");
        console.log(response);
       
        return response.data;
    }
    catch(error){
        console.log(`Error updating wallet money ${error}`);
        throw error;       // have to handle this error in frontend.
    }
}


// 5.) Frontend api to call backend api : To verify token
export const verifyToken = async ()=>{
    try{
        const response = await axios.post(`${backendURL}/users/verify-token`, {}, {withCredentials: true});
        return response.data;
    }
    catch(error){
        console.error("Error verfiying token: ", error);
        throw error;
    }
}
