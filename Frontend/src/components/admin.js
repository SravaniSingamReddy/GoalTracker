import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllEmployees } from './homeapi';

const Admin = () => {
  const params=useParams();
  const location=useLocation();
  const navigate=useNavigate();
  const [user,setUser]=useState([]);

  useEffect(()=>{
      async function getData(){
          const userresponse=await getAllEmployees(params.gdo);
          console.log(userresponse);            
          setUser(userresponse)          
      }
      getData();
  },[]);

  return (
    <div>
      admin page
      {user.map((item)=>(
        <div key={item.id}>
              <span>
              {item.name}     
              </span>
        </div>
    )  
    )}
</div>
  )
}

export default Admin