import React, { useState } from "react";
import '../App.css';
const Register=(props)=>{
    const [name,setName]=useState('');
    const [age,setAge]=useState('');
    const [skills,setSkills]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [mobile,setMobile]=useState('');
    const [gdo,setGdo]=useState('');
    const [role,setRole]=useState('');
    
    return(
        <div className="register">
            <form className="register-form">
            <div className="register-form-header">
                <h2>Sign Up</h2>
            </div>
            <div className="register-form-fields">
            <label>Name</label><br></br>
          <input value={name} type="text" placeholder="Enter your name" required onChange={(e)=>setName(e.target.value)}/>
        </div>
            <div className="register-form-fields">
            <label>Email</label><br></br>
          <input value={email} type="email" placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="register-form-fields">
                <label>Password</label><br></br>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password" required/>
            </div>
            <div className="register-form-fields">
            <label>Mobile</label><br></br>
          <input value={mobile} type="text" placeholder="Enter your mobile number" required onChange={(e)=>setMobile(e.target.value)}/>
        </div>
        <div className="register-form-fields">
            <label> Age </label><br></br>
          <input value={mobile} type="text" placeholder="Enter your mobile number" required onChange={(e)=>setMobile(e.target.value)}/>
        </div>        
            <div className="register-form-fields">
            <label>Skills</label><br></br>
          <input value={skills} type="text" placeholder="Enter your skills" required onChange={(e)=>setSkills(e.target.value)}/>
          </div> 
          <div className="register-select-group" >
              <div className="register-select">
          <label className="register-select-label">Select GDO:</label>
          <select value={gdo} onChange={(e)=>setGdo(e.target.value)}>
              <option >GDO1</option>
              <option >GDO2</option>
              <option >GDO3</option>
              <option >GDO4</option>
              <option >ALL</option>
          </select>
          </div>
          <div className="register-select" >
          <label className="register-select-label">Select Role:</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option>Employee</option>
              <option>Admin</option>
              <option>SAdmin</option>
          </select>
          </div>
          </div>
                
            <div>
                <p>Already a user? Sign in here</p>
            </div>
            <div className="rb">
                <button type="submit" >Sign Up</button>
            </div>
        </form>
    </div>
    )
}

export default Register;