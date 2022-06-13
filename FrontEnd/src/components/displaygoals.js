import 'antd/dist/antd.min.css'
import { useState,useEffect } from "react";
import { Button, Table, Modal, Input } from "antd";
import { addGoal, deleteGoal, editGoal, getAllGoals } from './apis/goalsapi';
import NavBarP from './Navbar';
import  {useLocation,useNavigate} from "react-router-dom";

function DisplayGoals() {
  const [goals,setgoals]=useState([]);
  const [isEditing, setIsEditing] = useState(false);
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
              >Edit</Button>
            
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
    const prevstatus=record.status    
    const id=record.id    
    setuserid(id)    
    seteditgoal(prevgoal)
    seteditstatus(prevstatus)
    console.log("**************")    
    console.log(editgoals)    
    console.log(editstatus)        
    console.log(userid)        
    console.log("**************")    
    
  };
  const  onDeleteGoal = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this goal?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
          deleteGoal(record.id);        
          getgoals();
          alert("goal delete Sucefully")
      },
    });
  };
 const resetEditing=()=>{
  setIsEditing(false);
    setuserid()    
    seteditgoal()
    seteditstatus()
    
 }
 const resetAdd=()=>{
  setIsAdd(false);  
  setnewgoal("")
  setnewstatus("Inprogress")  
 }

  return (
    <div className="App">
          <NavBarP />      
      <header className="App-header">
      <br></br>
      <label htmlFor="start">Select month and year to view Goals :  </label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);}} value={Month}/>
<br></br>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginTop: 16,marginBottom: 10
        }}
      >
        Add a Goal
      </Button>
      {goals.length>0?
        
      <div className="Tableborder">        
        <Table columns={columns} dataSource={goals} bordered></Table>
        </div>
       :<h6>There are no records to display</h6>}        
       
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            editGoal(userid,editstatus,editgoals);
            alert("goal edit sucsuffully")                      
            getgoals();
            resetEditing();                        
          }}
        >
          <Input value={editgoals} onChange={(e)=>{seteditgoal(e.target.value)    
          }}/>
          <select value={editstatus}  style={{ marginTop: 16 }} type="dropdown" onChange={(e)=>{seteditstatus(e.target.value)
    }}>
              <option>Inprogress</option>
              <option>Completed</option>
              <option>Failed</option>
          </select>
        
        </Modal>
        <Modal
          title="Add Student"
          visible={isAdd}
          okText="Save"
          onCancel={() => {
            resetAdd();
          }}
          onOk={() => {
            addGoal(newgoal,newstatus,location.state.id,Month);
            getgoals();
            resetAdd();         
            alert("goal added sucsuffully")                      
            }}
        >
          <Input  value={newgoal} type="text" placeholder="Enter your goal"  onChange={(e)=>setnewgoal(e.target.value)}/>        
        
          <select style={{ marginTop: 16 }} value={newstatus} type="dropdown" onChange={(e)=>setnewstatus(e.target.value)}>
              <option>Inprogress</option>
              <option>Completed</option>
              <option>Failed</option>
          </select>
        
        </Modal>
        <Button
        onClick={(e) => {
          navigate(-1);
          e.preventDefault();
        }}
        type="primary"
        style={{
          marginTop: 16,marginBottom: 10
        }}
      >
      Go Back
      </Button>
      
        </header>
    </div>
  );
}

export default DisplayGoals;