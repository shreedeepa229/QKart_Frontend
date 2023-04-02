import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import {
  InputAdornment,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useHistory } from "react-router-dom";


const Header = ({ children, hasHiddenAuthButtons, buttonText }) => {
  const history = useHistory()
  let tokenvalue = localStorage.getItem("token")
  let name = localStorage.getItem("username")
  

  
 
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Box>
       {children}
       </Box>
        {(hasHiddenAuthButtons) && <Button
          className="exploe-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick = {()=>{history.push("/")}}
        >
     {hasHiddenAuthButtons}
        </Button>}

      
           { (!(hasHiddenAuthButtons) && !(tokenvalue)) && (
       <div>
        
        <Button
          className="explore-button"
          variant="text"
          onClick = {()=>{history.push("/login")}}>
           Login
        </Button>
        
        <Button
          className="button" variant="contained"
          onClick = {()=>{history.push("/register")}}
        >
          Register
        </Button>
        </div>
        )}


            { (!(hasHiddenAuthButtons) && (tokenvalue)) && (
              <div>
       <Stack direction="row" spacing={2}>
       <img src="avatar.png" alt={name}/>
       <div class="imagetext">{name}</div>
       
       <Button
         className="explore-button"
         
         onClick = {()=>{localStorage.clear()
           window.location.reload()}}
       >
         Logout
       </Button>
       </Stack>
       </div>
        )}
         
      </Box>
    );
};

export default Header;
