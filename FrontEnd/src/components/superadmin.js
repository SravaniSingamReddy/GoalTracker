import React, {  useState } from 'react'
import DataTable from "react-data-table-component";
import { getAllGoals } from './apis/goalsapi';
import { getAdmin,  getAllEmployees } from './apis/usersapi';
import  {useLocation,useNavigate} from "react-router-dom";
import NavBarP from './Navbar';
import 'antd/dist/antd.min.css'
import { Table,Button } from "antd";

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
          state: { id:row.id },
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
    <div>
      <NavBarP/>
      Super Admin page
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
      select GDO Here :&nbsp;
      <select onClick={(e)=>{setshow(true);Admins(e.target.value);setGdo(e.target.value) }} onChange={(e)=>{setshow(true);Admins(e.target.value);setGdo(e.target.value) }}  value={gdo}>
              <option >GDO1</option>
              <option >GDO2</option>
              <option >GDO3</option>
              <option >GDO4</option>
              </select>
      <br></br>          
      <br></br>
      Admin Details :&nbsp;
      {show ?<div className="TableborderData">
            <DataTable bordered
            columns={columnsemp}
            data={admin}
          />              
          </div>
      :"Select GDO"}
      
      <br></br>
      <br></br>      
       Employee Details :&nbsp;      
      {show ?
      <div className="TableborderData">
      <DataTable bordered
      columns={columnsemp}
      data={employees}
    />              
    </div>
      :"Select Gdo"}
      
      select Employees Here :&nbsp;
      {show ?
      <select onClick={(e) => {
        console.log(e.target.value);
        Goals(e.target.value,Month)         
        setuserid(e.target.value)
        setshowgoals(true)
      }}
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
      :"Select Gdo"}
      <br></br>
      <br></br>     
      <label htmlFor="start">Select month and year :</label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);console.log("==========");console.log(userid,e.target.value);Goals(userid,e.target.value)}} value={Month}/>
    <br></br>
      <br></br>     
      
      Goals of selected Employee :&nbsp;
      {showgoals ?<div className="Tableborder">
        {goals.length>0?
          <Table columns={columns} dataSource={goals} bordered></Table>        
          :<h6>There are no records to display</h6>}            
          </div>
    :"Select Gdo and Employee"}
</div>
  )
}

export default SuperAdmin;