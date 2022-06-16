import React, { useState } from "react";
import '../App.css';
import register from "./apis/registerapi";
import { useNavigate } from 'react-router-dom';

const Register=()=>{
    const [name,setName]=useState('');
    const [age,setAge]=useState('');
    const [skills,setSkills]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [mobile,setMobile]=useState('');
    const [gdo,setGdo]=useState('GDO1');
    const [role,setRole]=useState('Employee');
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [mobileError, setMobileError] = useState('')
    const [ageError, setAgeError] = useState('');
    const [skillsError, setSkillsError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [gdoError, setGdoError] = useState('');
    
    const navigate = useNavigate();    
    
    return(
        <div className="registerform main">
              <div className="wrapper">
         <div className="title">
            Sign Up 
         </div>
         <form action="#">
         <div className="field">
            <input  type="text"  value={name} onChange={(e)=>{setName(e.target.value);setNameError("")}} required/>
            <label>Name</label>          
          <div>{nameError}</div>
        </div>
        <div className="field">
            <input  type="email" value={email} onChange={(e)=>{setEmail(e.target.value);setEmailError("")}} required/>
            <label>Email</label>          
          <div>{emailError}</div>        
            </div>
            <div className="field">
                <input type="password"  value={password} onChange={(e)=>{setPassword(e.target.value);setPasswordError("")}} required/>
                <label>Password</label>                
                <div>{passwordError}</div>        
            </div>
            
            <div className="field">
            <input  type="text" value={mobile}  onChange={(e)=>{setMobile(e.target.value);setMobileError("")}} required/>
            <label>Mobile</label>          
          <div>{mobileError}</div>        
        </div>
        <div className="field">
            <input  type="text" value={age} onChange={(e)=>{setAge(e.target.value);setAgeError("")}}  required/>
            <label> Age </label>          
          <span>{ageError}</span>                  
        </div>        
            <div className="field">
            <input  type="text"  value={skills} required onChange={(e)=>{setSkills(e.target.value);setSkillsError("")}}/>
            <label>Skills</label>          
          <div>{skillsError}</div>        
          </div> 
          <div className="register-select-group" >
              <div className="register-select">
          <label className="register-select-label">Select GDO :</label>
          <select value={gdo} onChange={(e)=>{setGdo(e.target.value);setGdoError("")}}>
              <option >GDO1</option>
              <option >GDO2</option>
              <option >GDO3</option>
              <option >GDO4</option>
              <option >ALL</option>
          </select>
          <div>{gdoError}</div>                          
          </div>
          <div className="register-select" >
          <label className="register-select-label">Select Role :</label>
          <select value={role} onChange={(e)=>{setRole(e.target.value);setRoleError("")}}>
              <option>Employee</option>
              <option>Admin</option>
              <option>Super Admin</option>
          </select>
          <div>{roleError}</div>                          
          </div>
          </div>
          <div className="signup-link">
               <p onClick={()=>navigate("/login")}>Already a user? Sign in here</p>            
          </div>
            <div className="field">
               <input type="submit" value="Sign Up" onClick={async (e) => {
                e.preventDefault();
                const response = await register(name,age,skills,email,password,mobile,gdo,role);                
                if(response.errors){
                    const errors=response.errors;
                    for (let i = 0; i < errors.length; i++) {
                        switch (errors[i].param) {
                            case "name": setNameError(errors[i].msg)
                                break;
                            case "age": setAgeError(errors[i].msg)
                                break;
                            case "skills": setSkillsError(errors[i].msg)
                                break;
                            case "email": setEmailError(errors[i].msg)
                                break;
                            case "password": setPasswordError(errors[i].msg)
                                break;
                            case "mobile": setMobileError(errors[i].msg)
                                break;
                           case "role": setRoleError(errors[i].msg)
                                break;
                            case "gdo": setGdoError(errors[i].msg)
                                break;
                           
                            default: (() => { })()
    
                        }
                }
            }
                else if(response.error){
                console.log(response);
                alert(response.error)
                //setRoleError(response.error)
                }
                else{
                    navigate("/login")                
                }
            }}/>
            </div>
           </form>
      </div>    
    </div>
    )
}

export default Register;