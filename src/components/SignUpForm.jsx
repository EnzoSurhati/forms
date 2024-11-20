import React, { useState } from "react";


export default function SignUpForm( {setToken} ) {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

  async function handleSubmit(event){
    event.preventDefault();

    // if (!username.length < 8) {
    //   setError("Username must have at least 8 characters.");
    //   return;
    // }

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const result = await response.json();
      if (!response.ok){
        throw new Error(result.message || "Signup failed");
      }
      setToken(result.token);
      console.log("Signup successfull: ", result);
    } catch (error) {
      setError(error.message);
      console.error("Signup error: ", error);
    }
  }
  return (
    <>
    <h2>Sign Up!</h2>
    
<form onSubmit={handleSubmit}>
  <label>
    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
  </label>
  <label>
    Password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
  </label>
  <button>Submit</button>
</form>
  </>
  );
}
