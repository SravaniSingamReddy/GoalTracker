import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import login from "./apis/loginapi";
const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");  
    const navigate = useNavigate();
    return(
        <div className="login">
            <form className="login-form" >
            <div className="login-form-header">
                <h2>Log In</h2>
            </div>
            <div className="login-form-fields">
                <label>Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email" required/>
            </div>
            <div className="login-form-fields">
                <label>Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter password" required/>
            </div>
            <div>
                <p onClick={()=>navigate("/")} className="loginbtn">Not Registered? Sign Up here</p>
            </div>
            <div className="login-form-btn">
                <button type="submit" onClick={async (e) => {
                e.preventDefault();
                const response = await login(email, password);                
                if(response.errors){
                    console.log(response.errors)
                }
                else{
            const userdetails=response.userDetails;
             localStorage.setItem("token", response.jwt);
                if(userdetails.role==="Super Admin"){
                    navigate("/superadmin")
                }
                else if(userdetails.role==="Admin"){
                    navigate("/admin", {
                        state: { gdo: userdetails.gdo },
                      })
                }
                else{
                    navigate("/employee",{
                        state: { id: userdetails.id },
                      })
                }
            }}}>Sign In</button>
            </div>
        </form>
        </div>
        
    )
}

export default Login;