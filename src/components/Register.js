import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [name,setname] = useState("")
  const [newpassword,setnewpassword] = useState("")
  const [confpassword,setconfpassword] = useState("")
  const [circle,setcircle] = useState(1)
  const history= useHistory()
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
 

  const register = async (formData) => {
    // formData.preventDefault()
    // console.log(formData)
    // console.log("hi")
    
    const approval = validateInput(formData)

    if(approval === true){
      const obj = 
      {
       username: formData.username,
       password: formData.password
      }
      setcircle(2)
      try{
      
        const res = await axios.post(`${config.endpoint}/auth/register`,obj)
        // console.log(res.data)
        enqueueSnackbar('Registered successfully')
        history.push("/login")
        setcircle(1)
      }catch(error){
        if(error.response.status===400){
          enqueueSnackbar(error.response.data.message)
        }
         
        else{
          enqueueSnackbar('something went wrong')
         }
         setcircle(1)
    }
    }
     
   }

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    let namelength = data.username.length
    let passwordlength = data.password.length
    console.log(namelength)
    console.log(passwordlength)
  
   if(data.username===""){
    enqueueSnackbar('Username is a required field')
    return false
   }
  if(namelength<6){
    enqueueSnackbar('Username must be at least 6 characters')
    return false
   }
   if(data.password === ""){
    enqueueSnackbar('Password is a required field')
    return false
   }
    if(passwordlength<6){
    enqueueSnackbar('Password must be at least 6 characters')
    return false
   }
   if(data.password !== data.confirmPassword){
    enqueueSnackbar('Passwords do not match')
    return false
   }
   
    return true
   
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      {/*  */}
      {/* <Header hasHiddenAuthButtons={(localStorage.getItem("username")!==null) ? true:false} buttonText="Register"/> */}
      <Header hasHiddenAuthButtons="BACK TO EXPLORE"/>
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
          
            id="username"
            label="Username"
             value={name}
            onChange = {(e)=>{setname(e.target.value)}}
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            value={newpassword}
            onChange = {(e)=>{setnewpassword(e.target.value)}}
           name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            value={confpassword}
            onChange = {(e)=>{setconfpassword(e.target.value)}}
            name="confirmPassword"
            type="password"
            fullWidth
          />
           {(circle===1) && <Button className="button" variant="contained" onClick={()=>{register({username:name,password:newpassword,confirmPassword: confpassword})}}>
            Register Now
           </Button>}
           {(circle === 2) && <CircularProgress className="circle"/>}
          <p className="secondary-action">
            Already have an account?{" "}
           
            <Link  className="link" to="/login">Login here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
