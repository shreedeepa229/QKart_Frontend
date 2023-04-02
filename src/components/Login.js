import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";


const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const[username, setusername] = useState("")
  const[password,setpassword] = useState("")
  const[loading,setloading] = useState(false)
  const history= useHistory()
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {

    let validated = validateInput(formData)
    if(validated){
      const obj={
        username:formData.username,
        password:formData.password
       }
       setloading(true)
        try{
          
          const res = await axios.post(`${config.endpoint}/auth/login`,obj)
          // localStorage.setItem("me","deepa")
          persistLogin(res.data.token,res.data.username,res.data.balance)
          enqueueSnackbar('Logged in successfully')
           history.push("/")
          
           setloading(false)
          //  console.log(res.data.token,res.data.username,res.data.balance)
        }catch(error){
          //  console.log(error.response.status)
          if(error.response.status===400){
             enqueueSnackbar(error.response.data.message)
             
           }
           
         else{
           enqueueSnackbar('something went wrong')
           
            }
            setloading(false)
      };
    }
   
}

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if(data.username===""){
      enqueueSnackbar('Username is a required field')
      return false
    }
    if(data.password===""){
      enqueueSnackbar('Password is a required field')
      return false
    }
    else{
      return true
    }
  };


  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    // console.log(token, username, balance)
    localStorage.setItem("token",token)
    localStorage.setItem("username",username)
    localStorage.setItem("balance",balance)
    // stote token,username,balance in local storage of browser
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      {/* <Header hasHiddenAuthButtons={localStorage.getItem("username")!==null ? true:false} buttonText="Login"/> */}
      <Header hasHiddenAuthButtons="BACK TO EXPLORE"/>
      <Box className="content">
        <Stack spacing={2} className="form">
        <h2 className="title">Login</h2>
        <TextField
            id="username"
            label="username"
            value={username}
            onChange ={(e)=>{setusername(e.target.value)}}
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Username"
            fullWidth
            
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            value={password}
            onChange ={(e)=>{setpassword(e.target.value)}}
           name="password"
            type="password"
            placeholder="Password"
            fullWidth
            />
            {(loading===false)&& <Button  variant="contained" onClick={()=>{login({ username:username, password:password })}}>LOGIN TO QKART</Button>}
            {(loading===true) && <CircularProgress className="circle"/>}
            <p className="secondary-action">
            Don’t have an account? {" "}
            <Link  className="link" to="/register">Register now</Link>
             </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
