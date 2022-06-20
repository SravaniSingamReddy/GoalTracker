async function register(name,age,skills,email,password,mobile,gdo_id,role_id) {
  console.log("======================")
  console.log(name,age,skills,email,password,mobile,gdo_id,role_id)
  console.log("======================")  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,age,skills,email,password,mobile,gdo_id,role_id
      }),
    };
    return fetch("/register", requestOptions).then((response) => response.json());
  }
  
export default register;