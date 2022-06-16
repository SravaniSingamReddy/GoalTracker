import React, {  useState } from 'react'
import DataTable from "react-data-table-component";
import { getAllGoals } from './apis/goalsapi';
import { getAdmin,  getAllEmployees } from './apis/usersapi';
import  {useLocation,useNavigate} from "react-router-dom";
import NavBarP from './Navbar';
import 'antd/dist/antd.min.css'
import { Table,Button,Tag } from "antd";
import Login from './login';

const SuperAdmin = () => {
  const [admin,setadmin]=useState([]);
  const [employees,setemployees]=useState([]);  
  const [show,setshow]=useState(false);
  const [goals,setgoals]=useState([]);
  const [userid,setuserid]=useState();
  const [gdo,setGdo]=useState();  
  const [showgoals,setshowgoals]=useState(false)
  const navigate = useNavigate();    
  const [admingoals,setadmingoals]=useState([]);  
  const location = useLocation();

  var todayDate = new Date().toISOString().slice(0, 7);  
  
  const [Month,setMonth] = useState(todayDate);
  
  const columns = [
    {
      key: "1",
      title: "Goal",
      dataIndex: "goal",
    },
    {
      key: '2',      
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
            <Tag color={color} key={2}>{status.toUpperCase()}</Tag>
          </>
          )    
      }
    },
  ]
  const columnsemp = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },    
    {
      name: "Skills",
      selector: (row) => row.skills,
    },
    {
      name: "Goals",
      selector: (row) => <Button onClick={() => {
        navigate("/goals",{
          state: { id:row.id,name:row.name },
        })
      }}
      
      type="link" >View Goals</Button>,
    },    
  ];
    
const Admins= async (gdo)=>{
  console.log("=========")
  const Admin=await getAdmin(gdo);
  setadmin(Admin)              
  console.log(Admin)
  const Allemployees=await getAllEmployees(gdo);
  setemployees(Allemployees)              
}
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
    <button className="btn"
          onClick={() => {
            navigate("/employee",{
              state: { id:location.state.id ,check:true,name:location.state.name},
            })
          }}
        >
          View Your Goals
        </button>
        <br></br>      
      <br></br>      
      <span className='sideheading'>Select GDO Here :</span>
      <select onClick={(e)=>{setshow(true);Admins(e.target.value);setGdo(e.target.value) }} onChange={(e)=>{setshow(true);Admins(e.target.value);setGdo(e.target.value) }}  value={gdo}>
              <option >GDO1</option>
              <option >GDO2</option>
              <option >GDO3</option>
              <option >GDO4</option>
              </select>
      <br></br>          
      <br></br>
      <span className='sideheading2'>Admin Details :</span>
      {show ?<div className="TableborderData">
            <DataTable bordered
            columns={columnsemp}
            data={admin}
          />              
          </div>
      :<span className="spanp">Select GDO to see admin details</span>}
      
      <br></br>
      <br></br>      
      <span className='sideheading2'>Employee Details :</span>
      {show ?
      <div className="TableborderData">
      <DataTable bordered
      columns={columnsemp}
      data={employees}
    />              
    </div>
      :<span className="spanp">Select Gdo</span>}
  </div>
:<Login />
}

</div>


  )
}

export default SuperAdmin;