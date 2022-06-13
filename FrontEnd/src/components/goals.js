import 'antd/dist/antd.min.css'
import { useState,useEffect } from "react";
import { Button, Table} from "antd";
import { getAllGoals } from './apis/goalsapi';
import NavBarP from './Navbar';
import  {useLocation,useNavigate} from "react-router-dom";

function Goals() {
  const [goals,setgoals]=useState([]);
  const location = useLocation();
  const navigate = useNavigate();    
  
  var todayDate = new Date().toISOString().slice(0, 7);  
  
  const [Month,setMonth] = useState(todayDate);
  
  useEffect(()=>{
    async function getData(){
      const goals=await getAllGoals(location.state.id,Month);
      console.log(goals)
      setgoals(goals);            
        }
    getData();
},[Month]);

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
  ];

  return (
    <div className="App">
          <NavBarP />      
      <br></br>
      <label htmlFor="start">Select month and year to view Goals :  </label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);}} value={Month}/>
    <br></br>
      {goals.length>0?        
      <div className="Tableborder">        
        <Table columns={columns} dataSource={goals} bordered></Table>
        </div>
       :<h6>There are no records to display</h6>}        
       
        <Button
        onClick={(e) => {
          navigate(-1);
          e.preventDefault();
        }}
        type="primary"        
      >
      Back
      </Button>      
        
    </div>
  );
}

export default Goals;