import React, { useEffect, useState } from 'react'
import { getadmins, getAllEmployees, getAllGoals } from './homeapi';
import { Link, useNavigate } from 'react-router-dom';
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';

const Home = () => {
  const [admins,setadmins]=useState([]);
  const [employees,setemployees]=useState([]);  
  const navigate=useNavigate();
  const [show,setshow]=useState(false);
  const [employeeid,setemployeeid]=useState()
  const [goals,setgoals]=useState([]);
  const [showgoals,setshowgoals]=useState(false)
  useEffect(()=>{
    async function getData(){
        const users=await getadmins();
        console.log(users);
        setadmins(users)        
    }
    getData();
},[]);
const Admins= async (gdo)=>{
  const Allemployees=await getAllEmployees(gdo);
  console.log(Allemployees);
  setemployees(Allemployees)        

}
const Goals= async (id)=>{
  const goals=await getAllGoals(id);
  console.log(goals);
  setgoals(goals)        

}

  return (
    <div>
      home page
      <br></br>
      <br></br>      
      select Admins Here :&nbsp;
      <select
        onChange={(e) => {
          console.log(e.target.value);
          Admins(e.target.value)
          setshow(true)
        }}
      >
        {admins.map((item) => (
          <option key={item.id} value={item.gdo}>
            {item.name}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>      
      select Employees Here :&nbsp;
      {show ?
      <select
        onChange={(e) => {
          console.log(e.target.value);
          setemployeeid(e.target.value); 
          Goals(e.target.value)         
          setshowgoals(true)
        }}
      >
        {employees.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      :"Select Admin"}
      <br></br>
      <br></br>            
      Goals of selected Employee :&nbsp;
      {showgoals ?
      <select
        onChange={(e) => {
          console.log(e.target.value);
          Goals(e.target.value)         
        }}
      >
        {goals.map((item) => (
          <option key={item.id} value={item.id}>
            {item.goal}
          </option>
        ))}
      </select>
      :"Select Admin and Employee"}
      
</div>
  )
}

export default Home;