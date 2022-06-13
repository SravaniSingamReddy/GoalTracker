async function register(name,age,skills,email,password,mobile,gdo,role) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,age,skills,email,password,mobile,gdo,role
      }),
    };
    return fetch("/register", requestOptions).then((response) => response.json());
  }
  
export default register;