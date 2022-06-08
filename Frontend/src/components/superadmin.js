import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import { getAllGoals } from './apis/goalsapi';
import { getadmins, getAllEmployees } from './apis/usersapi';
import { useNavigate } from 'react-router-dom';

const SuperAdmin = () => {
  const [admins,setadmins]=useState([]);
  const [employees,setemployees]=useState([]);  
  const [show,setshow]=useState(false);
  const [goals,setgoals]=useState([]);
  const [userid,setuserid]=useState();
  const [showgoals,setshowgoals]=useState(false)
  const navigate = useNavigate();    
    
  var todayDate = new Date().toISOString().slice(0, 7);  
  
  const [Month,setMonth] = useState(todayDate);
  
  const columns = [
    {
      name: "Goal",
      selector: (row) => row.goal,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },    
  ];
  
  
  useEffect(()=>{
    async function getData(){
        const users=await getadmins();
        console.log(users);
        setadmins(users)        
    }
    getData();
},[]);
const Admins= async (gdo)=>{
  const Allemployees=await getAllEmployees(gdo);
  console.log(Allemployees);
  setemployees(Allemployees)        

}
const Goals= async (id,Month)=>{
  const goals=await getAllGoals(id,Month);
  console.log("====================")
  console.log(id,Month);  
  console.log(goals);
  console.log("====================")  
  setgoals(goals)        

}

  return (
    <div>
      Super Admin page
    <br></br>
      <br></br>      
      select Admins Here :&nbsp;
      <select
        onChange={(e) => {
          console.log(e.target.value);
          Admins(e.target.value)
          setshow(true)
        }}
      >
        {admins.map((item) => (
          <option key={item.id} value={item.gdo}>
            {item.name}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>      
      select Employees Here :&nbsp;
      {show ?
      <select
        onChange={(e) => {
          console.log(e.target.value);
          Goals(e.target.value,Month)         
          setuserid(e.target.value)
          setshowgoals(true)
        }}
      >
        {employees.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      :"Select Admin"}
      <br></br>
      <br></br>     
      <label htmlFor="start">Select month and year :</label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);console.log("==========");console.log(userid,e.target.value);Goals(userid,e.target.value)}} value={Month}/>
    <br></br>
      <br></br>     
      
      Goals of selected Employee :&nbsp;
      {showgoals ?
            <DataTable
            columns={columns}
            data={goals}
          />
    :"Select Admin , Employee or Month"}
         <br></br>     
    <br></br>
      <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>

</div>
  )
}

export default SuperAdmin;