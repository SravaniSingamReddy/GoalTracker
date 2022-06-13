import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addGoal } from "./apis/goalsapi";
import NavBarP from "./Navbar";

const AddGoal = () => {
  const location = useLocation();
  const [status,setstatus]=useState("Inprogress");
  const [newgoal,setnewgoal]=useState();
  const navigate = useNavigate()
  
  
  var todayDate = new Date().toISOString().slice(0, 7);    
  const [Month,setMonth] = useState(todayDate);

  
  const addnewgoal=async (newgoal,status)=>{
    console.log(newgoal,status,location.state.id,Month)  
    const response=await addGoal(newgoal,status,location.state.id,Month)
    console.log(response);
  }
  
  return (
    <div>
      <NavBarP/>
      <br></br>
      <br></br>   

    <label htmlFor="start">Select month and year : </label>
    <input id="start" type="month" onChange={(e)=>{setMonth(e.target.value);}} value={Month}/>
    <br></br>    
    <br></br>
    <label htmlFor="go">Goal : </label>    
        <input  id="go" value={newgoal} type="text" placeholder="Enter your goal"  onChange={(e)=>setnewgoal(e.target.value)}/>        
          <label className="register-select-label">Select Status:</label>
          <select value={status} type="dropdown" onChange={(e)=>setstatus(e.target.value)}>
              <option>Inprogress</option>
              <option>Completed</option>
              <option>Failed</option>
          </select>
        <button type='submit' onClick={(e) =>{ addnewgoal(newgoal,status);alert("goal added successfully");
                    navigate("/employee",{
                        state: { id:  location.state.id},
                      })}}>AddGoal</button>
        </div>
  );
};

export default AddGoal;