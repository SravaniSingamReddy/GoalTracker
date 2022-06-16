import 'antd/dist/antd.min.css'
import { useState,useEffect } from "react";
import { Button, Table,Tag} from "antd";
import { getAllGoals } from './apis/goalsapi';
import NavBarP from './Navbar';
import  {useLocation,useNavigate} from "react-router-dom";
import Login from './login';

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
  ];

  return (
    <div>{
      localStorage.getItem("token")?
    
    <div className="main">
          <NavBarP />      
          <h2 className="welcome">Welcome {location.state.name} </h2>
      <label htmlFor="start" className='sideheading'>Select month and year to view Goals :  </label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);}} value={Month}/>
    <br></br>
    <span className='sideheading2'>{location.state.name} Goals :</span>            
      {goals.length>0?        
      <div className="Tableborder">        
        <Table columns={columns} dataSource={goals} bordered></Table>
        </div>
       :<h6 style={{
        color: "#fff",
        fontSize:"19px"               
       }}>There are no records to display</h6>}        
       
        <button
        className="btn" 
        onClick={(e) => {
          navigate(-1);
          e.preventDefault();
        }}
        type="primary"        
      >
      Back
      </button>      
        
    </div>
    :
    <Login />
    }
    
    </div>   
    
  );
}

export default Goals;