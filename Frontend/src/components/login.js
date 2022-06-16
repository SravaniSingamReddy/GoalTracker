import React, { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import login from "./apis/loginapi";
const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");  
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const navigate = useNavigate();
    return(
        <div className="loginform main">
            <div className="wrapper">
         <div className="title">
            Login Form
         </div>
         <form action="#">
            <div className="field">
               <input type="email" onChange={(e)=>{setEmail(e.target.value);setEmailError("")}} value={email}  required/>            
               <label>Email Address</label>                           
               <div>{emailError}</div>
              </div>
              <br></br>            
            <div className="field">                                    
            <input type="password" onChange={(e)=>{setPassword(e.target.value);setPasswordError("")}} value={password}  required/>
            <label>Password</label>            
                <div>{passwordError}</div>
            </div>
            <br></br>
            <div className="field">
               <input type="submit" value="Login" onClick={async (e) => {
                e.preventDefault();
                const response = await login(email, password);                
                if(response.errors){
                    console.log(response.errors)
                    const errors=response.errors;
                    for (let i = 0; i < errors.length; i++) {
                        switch (errors[i].param) {
                            case "email": setEmailError(errors[i].msg)
                                break;
                            case "password": setPasswordError(errors[i].msg)
                                break;                           
                            default: (() => { })()
                        }
                }
                } 
                else if((response.errorpassword) || (response.erroremail)){
                    console.log(response)
                    if(response.errorpassword)   {
                        setPasswordError(response.errorpassword)
                    }
                    else{
                        setEmailError(response.erroremail);
                    }
                }
                
                else{
            const userdetails=response.userDetails;
             localStorage.setItem("token", response.jwt);
                if(userdetails.role==="Super Admin"){
                    navigate("/superadmin",{
                        state: { id: userdetails.id ,name:userdetails.name,userdetails:userdetails},
                      })
                }
                else if(userdetails.role==="Admin"){
                    navigate("/admin", {
                        state: { id: userdetails.id,gdo: userdetails.gdo ,name:userdetails.name,userdetails:userdetails},
                      })
                }
                else{
                    navigate("/employee",{
                        state: { id: userdetails.id,check:false ,name:userdetails.name,userdetails:userdetails},
                      })
                }
            }}}/>
            </div>
            <div className="signup-link">
               <p onClick={()=>navigate("/register")}>   Not a member? Signup now </p>
            
            </div>
         </form>
      </div>          
      </div>  
        
        
    )
}

export default Login;