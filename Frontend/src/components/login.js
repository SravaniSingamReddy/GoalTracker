import React, { useState } from "react";
import axios from "axios";
const Login=(props)=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");  
    function handleLogin(e){
        e.preventDefault();
        axios({
            method:'post',
            url:'/login',
            contentType:'application/json',
            data:{
                email,
                password
            }
        }).then((response)=>{
            console.log(response.data);
        }).catch((err)=>{            
            console.log(err);
        });
    }
    return(
        <div className="login">
            <form className="login-form" onSubmit={handleLogin}>
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
            <div className="not-login">
                <p >Not Registered? Sign Up here</p>
            </div>
            <div className="login-form-btn">
                <button type="submit">Sign In</button>
            </div>
        </form>
        </div>
        
    )
}

export default Login;
