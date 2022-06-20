import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import  {useLocation,useNavigate} from "react-router-dom";
import { getAllGoals } from './apis/goalsapi';
import { getAllEmployees } from './apis/usersapi';
import NavBarP from './Navbar';
import 'antd/dist/antd.min.css'
import { Button,Table,Tag} from "antd";
import Login from './login';

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
      key: "1",
      title: "Goal",
      dataIndex: "goal",
    },
    {
      key: "2",
      title: "Goal Created",
      dataIndex: "date",
    },
    
    {
      key: '3',      
      title: 'Status',
      dataIndex: 'status',      
      render:(status)=>{
        let color="blue"
        
        if (status==="Completed"){
          color="green"
          }
        else if(status==="Failed"){
          color='volcano'
          }          
          return(
            <>
            <Tag color={color} key={3}>{status.toUpperCase()}</Tag>
          </>
          )    
      }
    },    
  ]
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
    <div>{
      localStorage.getItem("token")?
    <div className="main">
      <NavBarP/>      
      <h2 className="welcome">Welcome {location.state.name} </h2>      
    <button
      className="btn"      
          onClick={() => {
            navigate("/employee",{
              state: { id:location.state.id,name:location.state.name ,check:true},
            })
          }}
        >
          View Your Goals
        </button>
        <br></br>
      <br></br>           
      
      <label htmlFor="start" className='sideheading'>Select month and year :</label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);Goals(userid,e.target.value)}} value={Month}/>    
    <br></br>
      <br></br>                       
      <span className='sideheading'>select Employees Here :</span>
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
          <option key={item.user.id} value={item.user.id}>
            {item.user.name}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>           
      <span className='sideheading2'>Goals of selected Employee :</span>      
      {showgoals ?            <div>
          {goals.length>0?
        
            <div className="Tableborder">        
              <Table columns={columns} dataSource={goals} bordered></Table>
              </div>
             :<h6 style={{
              color: "#fff",
              fontSize:"19px"               
             }}>There are no records to display</h6>}        
             </div>
            
    :<span className="spanp">Select Admin , Employee or Month</span>}      
      
</div>
:<Login />
}

</div>

  )
}

export default Admin;