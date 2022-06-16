import React, { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import login from "./apis/loginapi";
import  {Navigate, useLocation} from "react-router-dom";

const Profile=()=>{
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className="loginform">
            <div className="wrapper">
         <div className="title">
            Profil Page
        </div>
      </div>          
      </div>  
        
        
    )
}

export default Profile;