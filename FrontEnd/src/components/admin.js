import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import  {useLocation,useNavigate} from "react-router-dom";
import { getAllGoals } from './apis/goalsapi';
import { getAllEmployees } from './apis/usersapi';
import NavBarP from './Navbar';
import 'antd/dist/antd.min.css'
import { Button } from "antd";

const Admin = () => {
  const [employees,setemployees]=useState([]);  
  const [goals,setgoals]=useState([]);
  const [userid,setuserid]=useState();
  const [showgoals,setshowgoals]=useState(false)
  const location = useLocation();
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
      const Allemployees=await getAllEmployees(location.state.gdo);
      setemployees(Allemployees)        
      }
    getData();
},[]);

const Goals= async (id,Month)=>{
  const goals=await getAllGoals(id,Month);
  setgoals(goals)          
}

  return (
    <div>
      <NavBarP/>      
      Admin Goals
      <br></br>
      <br></br>           
      
      <Button
          onClick={() => {
            navigate("/employee",{
              state: { id:location.state.id ,check:true},
            })
          }}
          type="primary"
        >
          View Your Goals
        </Button>
        <br></br>
      <br></br>           
      
      <label htmlFor="start">Select month and year :</label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);Goals(userid,e.target.value)}} value={Month}/>    
    <br></br>
      <br></br>                 
      select Employees Here :&nbsp;
      <select
      onClick={(e) => {
        console.log(e.target.value);
        setuserid(e.target.value)
        Goals(e.target.value,Month)  
        setshowgoals(true)
      }}
        onChange={(e) => {
          console.log(e.target.value);
          setuserid(e.target.value)
          Goals(e.target.value,Month)  
          setshowgoals(true)
        }}
      >
        {employees.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>           
      Goals of selected Employee :&nbsp;
      {showgoals ?            
          <div>
        {goals.length>0?<DataTable
            columns={columns}
            data={goals}            
          />:<h6>There are no records to display</h6>}
            
          </div>
          
    :"Select Admin , Employee or Month"}      
      
</div>
  )
}

export default Admin;