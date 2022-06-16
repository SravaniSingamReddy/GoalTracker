async function getadmins(){
    const requestOptions = {
        method:"GET",
        headers: {
          Authorization:  'Bearer ' + localStorage.getItem('token')
        },
    };
    return fetch('/users/admins',requestOptions).then((response) => response.json());
}
async function getAllEmployees(gdo){
    const requestOptions = {
        method:"GET",
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    return fetch(`/users/employee/${gdo}`,requestOptions).then((response) => response.json());
}
async function getAdmin(gdo){
  const requestOptions = {
      method:"GET",
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
  };
  return fetch(`/users/admin/${gdo}`,requestOptions).then((response) => response.json());
}

export {getAllEmployees,getadmins,getAdmin};