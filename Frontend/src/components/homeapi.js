async function getadmins(){
    const requestOptions = {
        method:"GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0VtcGxveWVlIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTY1NDUyMDkyMX0.T2FJrA77ai9493_tDjlrbSdL6mb6Pk4OyUrrekMTWwc`,
        },
    };
    return fetch('/users/admins',requestOptions).then((response) => response.json());
}
async function getAllEmployees(gdo){
    const requestOptions = {
        method:"GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0VtcGxveWVlIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTY1NDUyMDkyMX0.T2FJrA77ai9493_tDjlrbSdL6mb6Pk4OyUrrekMTWwc`,
        },
    };
    return fetch(`/users/employee/${gdo}`,requestOptions).then((response) => response.json());
}
async function getAllGoals(id){
    const requestOptions = {
        method:"GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0VtcGxveWVlIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTY1NDUyMDkyMX0.T2FJrA77ai9493_tDjlrbSdL6mb6Pk4OyUrrekMTWwc`,
        },
    };
    return fetch(`/goals/${id}`,requestOptions).then((response) => response.json());
}

export {getAllEmployees,getadmins,getAllGoals};