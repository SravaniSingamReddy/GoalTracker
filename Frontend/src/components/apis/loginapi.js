async function login(email, password) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,password,
      }),
    };
    return fetch("/login", requestOptions).then((response) => response.json()).catch((err)=>{
      err.json()
  });
  }
  
export default login;