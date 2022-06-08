async function getAllGoals(id,Month){
    const requestOptions = {
        method:"GET",
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    return fetch(`/goals/userid/${id}/${Month}`,requestOptions).then((response) => response.json());
}
async function addGoal(goal,status,user_id,date){
  console.log(goal,status,user_id,date)
  const requestOptions = {
    method:"POST",
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
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
export {getAllGoals,addGoal};