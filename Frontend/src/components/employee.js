import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import  {useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getAllGoals } from './apis/goalsapi';
import NavBarP from './Navbar';

const Employee = () => {
  const [goals,setgoals]=useState([]);
  const location = useLocation();
  const navigate = useNavigate();


  var todayDate = new Date().toISOString().slice(0, 7);  
  
  const [Month,setMonth] = useState(todayDate);
  const MDate=new Date().toISOString().slice(0, 10)
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
      const goals=await getAllGoals(location.state.id,Month);
      setgoals(goals)        
        }
    getData();
},[Month]);


  return (
    <div>{
      localStorage.getItem("token")?    
    <div>
      <NavBarP />
              Employee page
      <br></br>
      <br></br>     
    <label htmlFor="start">Select month and year : </label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);}} value={Month}/>
    <br></br>
    <br></br>           
    <button
          onClick={() => {
            navigate("/addgoal", {
              state: { id: location.state.id },
            });
          }}
        >
          Add Goal
        </button>
    <br></br>     
    <br></br>     
      Goals :      
            <DataTable
            columns={columns}
            data={goals}
          />
    <br></br>     
    <br></br>
    <table className="my-4">
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((item) => (
            <tr key={item.id}>
              <td>{item.goal}</td>
              <td>{item.status}</td>
              <td>{item.date}</td>
              <td>
                <button
                className="button2"
                  onClick={() => {                    
                    window.location.reload();
                  }}
                >
                  Delete Goal
                </button>
              </td>
              <td>
                <button
                className="button2"
                  onClick={() => {
                    navigate("/editgoal", {
                      state: {
                        id: item.id,
                        gaol_name: item.goal,
                        status: item.status,
                      },
                    });
                  }}
                >
                  Edit Goal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
</div>
:
<div>
  Log in first
<button
        onClick={(e) => {
          navigate("/login");
          e.preventDefault();
        }}
        type="primary"
        style={{
          marginTop: 16,marginBottom: 10
        }}
      >
      Go to Login Page
      </button>
      
 
</div>
}

</div>


  )
}

export default Employee;
