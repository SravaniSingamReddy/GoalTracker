import React, {  useState } from 'react'
import DataTable from "react-data-table-component";
import { getAdmin,  getAllEmployees } from './apis/usersapi';
import  {useLocation,useNavigate} from "react-router-dom";
import NavBarP from './Navbar';
import 'antd/dist/antd.min.css'
import { Button } from "antd";
import Login from './login';

const SuperAdmin = () => {
  const [admin,setadmin]=useState([]);
  const [employees,setemployees]=useState([]);  
  const [show,setshow]=useState(false);
  const [gdo,setGdo]=useState();  
  const navigate = useNavigate();    
  const location = useLocation();
  const columnsemp = [
    {
      name: "Name",
      selector: (row) => row.user.name,
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
    },    
    {
      name: "Skills",
      selector: (row) => row.user.skills,
    },
    {
      name: "Goals",
      selector: (row) => <Button onClick={() => {
        navigate("/goals",{
          state: { id:row.user.id,name:location.state.name},
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
              <option value="1">GDO1</option>
              <option value="2">GDO2</option>
              <option value="3">GDO3</option>
              <option value="4">GDO4</option>
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