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
        <div className="register">
            <form className="register-form">
            <div className="register-form-header">
                <h2>Sign Up</h2>
            </div>
            <div className="register-form-fields">
            <label>Name</label><br></br>
          <input value={name} type="text" placeholder="Enter your name" required onChange={(e)=>setName(e.target.value)}/>
          <br></br><span>{nameError}</span>
        </div>
            <div className="register-form-fields">
            <label>Email</label><br></br>
          <input value={email} type="email" placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)}/>
          <br></br><span>{emailError}</span>
        
            </div>
            <div className="register-form-fields">
                <label>Password</label><br></br>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password" required/>
                <br></br><span>{passwordError}</span>
        
            </div>
            <div className="register-form-fields">
            <label>Mobile</label><br></br>
          <input value={mobile} type="text" placeholder="Enter your mobile number" required onChange={(e)=>setMobile(e.target.value)}/>
          <br></br><span>{mobileError}</span>        
        </div>
        <div className="register-form-fields">
            <label> Age </label><br></br>
          <input value={age} type="text" placeholder="Enter your mobile number" required onChange={(e)=>setAge(e.target.value)}/>
          <br></br><span>{ageError}</span>                  
        </div>        
            <div className="register-form-fields">
            <label>Skills</label><br></br>
          <input value={skills} type="text" placeholder="Enter your skills" required onChange={(e)=>setSkills(e.target.value)}/>
          <br></br><span>{skillsError}</span>        
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
          <br></br><span>{gdoError}</span>                          
          </div>
          <div className="register-select" >
          <label className="register-select-label">Select Role:</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option>Employee</option>
              <option>Admin</option>
              <option>Super Admin</option>
          </select>
          <br></br><span>{roleError}</span>                          
          </div>
          </div>
                
            <div>
                <p onClick={()=>navigate("/login")}>Already a user? Sign in here</p>
            </div>
            <div className="rb">
                <button type="submit" onClick={async (e) => {
                e.preventDefault();
                const response = await register(name,age,skills,email,password,mobile,gdo,role);                
                if(response.errors){
                    const errors=response.errors;
                    console.log(response.errors)
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
                else{
                console.log(response);
                navigate("/login")
                }
            }}>Sign Up</button>
            </div>
        </form>
    </div>
    )
}

export default Register;