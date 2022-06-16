import 'antd/dist/antd.min.css'
import { useState,useEffect } from "react";
import { Button, Table, Modal, Input ,Tag} from "antd";
import { addGoal, deleteGoal, editGoal, getAllGoals ,updateGoalStatus} from './apis/goalsapi';
import NavBarP from './Navbar';
import  {useLocation,useNavigate} from "react-router-dom";
import Login from './login';

function DisplayGoals() {
  const [goals,setgoals]=useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);  
  const [isAdd, setIsAdd] = useState(false);  
  const [newgoal,setnewgoal]=useState()
  const [newstatus,setnewstatus]=useState("Inprogress")
  const [editgoals,seteditgoal]=useState()
  const [editstatus,seteditstatus]=useState()
  const [userid,setuserid]=useState()  
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

async function getgoals(){
  const goals=await getAllGoals(location.state.id,Month);
  setgoals(goals)          
  console.log(newgoal,newstatus)
}
     
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
    {
      key: "3",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Button type="link" onClick={() => {
                onEditGoal(record);
              }}
              >Edit Goal</Button>
            <Button type="link" onClick={() => {
                onUpdateGoal(record);
              }}
              >Update Status</Button>
            
            <Button type="link" onClick={() => {
                onDeleteGoal(record);
              }}
              >Delete</Button>
            
          </>
        );
      },
    },
  ];
  const handleAdd = () => {
    setIsAdd(true)    
  };
  
  const onEditGoal=(record)=>{
    setIsEditing(true)
    const prevgoal=record.goal
    const id=record.id    
    setuserid(id)    
    seteditgoal(prevgoal)
    
  };
  const onUpdateGoal=(record)=>{
    setIsUpdating(true)
    const prevstatus=record.status    
    const id=record.id    
    setuserid(id)    
    seteditstatus(prevstatus)
    
  };
  
  const  onDeleteGoal = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this goal?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
          deleteGoal(record.id);        
          getgoals();
          alert("goal delete Successfully")
      },
    });
  };
 const resetEditing=()=>{
  setIsEditing(false);
    setuserid()    
    seteditgoal()    
 }
 const resetUpdating=()=>{
    setIsUpdating(false);
    setuserid()    
    seteditstatus()
    
 }
 
 const resetAdd=()=>{
  setIsAdd(false);  
  setnewgoal("")
  setnewstatus("Inprogress")  
 }
   return (
    <div>{
      localStorage.getItem("token")?    
    <div className="App main">
          <NavBarP />      
      <header className="App-header">
      <h2 className="welcome">Welcome {location.state.name} </h2>
      <label htmlFor="start" className="sdate">Select month and year to view Goals :  </label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);}} value={Month}/>
<br></br>
      <button 
      onClick={handleAdd}        
      className="btn"
      >Add New Goal</button>
            <br></br>
            <br></br>      
      <h4 className="tableheading">List of Goals : </h4>
      {goals.length>0?
        
      <div className="Tableborder">        
        <Table columns={columns} dataSource={goals} bordered></Table>
        </div>
       :<h6 style={{
        color: "#fff",
        fontSize:"19px"               
       }}>There are no records to display</h6>}        
       
        <Modal
          title="Edit Goal"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            editGoal(userid,editgoals);
            getgoals();
            resetEditing();                        
            alert("goal edit Successfully")                      
            
          }}
        >
          <Input value={editgoals} onChange={(e)=>{seteditgoal(e.target.value)    
          }}/>
        </Modal>
        <Modal
          title="Update Goal Status"
          visible={isUpdating}
          okText="Save"
          onCancel={() => {
            resetUpdating()
          }}
          onOk={() => {
            updateGoalStatus(userid,editstatus);
            getgoals();
            resetUpdating();                        
            alert("goal status updated Successfully")                      
            
          }}
        >
          <select value={editstatus}  style={{ marginTop: 16 }} type="dropdown" onChange={(e)=>{seteditstatus(e.target.value)
    }}>
              <option>Inprogress</option>
              <option>Completed</option>
              <option>Failed</option>
          </select>
        
        </Modal>    
        <Modal
          title="Add New Goal"
          visible={isAdd}
          okText="Save"
          onCancel={() => {
            resetAdd();
          }}
          onOk={() => {
            addGoal(newgoal,newstatus,location.state.id,Month);
            getgoals();
            resetAdd();         
            alert("goal added Successfully")                      
            }}
        >
          <Input  value={newgoal} type="text" placeholder="Enter your goal"  onChange={(e)=>setnewgoal(e.target.value)}/>        
        
          <select style={{ marginTop: 16 }} value={newstatus} type="dropdown" onChange={(e)=>setnewstatus(e.target.value)}>
              <option>Inprogress</option>
              <option>Completed</option>
              <option>Failed</option>
          </select>
        
        </Modal>
        
        <button
        className="btn"        
        onClick={(e) => {
          navigate(-1);
          e.preventDefault();
        }}
        >
      Go Back
      </button>
      
        </header>
    </div>
    :<Login />
    }
    
    </div>
    
    
  );
}

export default DisplayGoals;