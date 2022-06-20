async function getAllGoals(id,Month){
    const requestOptions = {
        method:"GET",
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    return fetch(`/goals/userid/${id}/${Month}`,requestOptions).then((response) => response.json());
}

async function getGoals(Month){
  const requestOptions = {
      method:"GET",
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
  };
  return fetch(`/goals/${Month}`,requestOptions).then((response) => response.json());
}

async function addGoal(goal,status,user_id,date){
  console.log("===================================")
  console.log(goal,status,user_id,date)
  console.log("===================================")
  
  const requestOptions = {
    method:"POST",
    headers: {
          Authorization:  'Bearer ' + localStorage.getItem('token'),
           "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goal,
      status,
      date,
      user_id
    }),
  };
  return fetch(`/goals`, requestOptions).then((response) => response.json());
}
async function deleteGoal(id){
  console.log("==================")
  console.log(id)
  const requestOptions = {
    method:"DELETE",
    headers: {
      Authorization:  'Bearer ' + localStorage.getItem('token'),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id
    }),
  };
  return fetch(`/goals`, requestOptions).then((response) => response.json());
}

async function editGoal(id,goal){
  console.log("==================")
  console.log(id,goal)
  console.log("==================")
  
  const requestOptions = {
    method:"PUT",
    headers: {
      Authorization:  'Bearer ' + localStorage.getItem('token'),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,goal
    }),
  };
  return fetch(`/goals/editgoal`, requestOptions).then((response) => response.json());
}
async function updateGoalStatus(id,status){
  console.log("==================")
  console.log(id,status)
  console.log("==================")
  
  const requestOptions = {
    method:"PUT",
    headers: {
      Authorization:  'Bearer ' + localStorage.getItem('token'),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,status
    }),
  };
  return fetch(`/goals/updatestatus`, requestOptions).then((response) => response.json());
}

export {getAllGoals,addGoal,deleteGoal,editGoal,updateGoalStatus,getGoals};