import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import  {useLocation,useNavigate} from "react-router-dom";
import { getAllGoals } from './apis/goalsapi';
import { getAllEmployees } from './apis/usersapi';

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
      Admin page
    <br></br>
      <br></br>      
      select Employees Here :&nbsp;
      <select
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
    <label htmlFor="start">Select month and year :</label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);Goals(userid,e.target.value)}} value={Month}/>
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

export default Admin;