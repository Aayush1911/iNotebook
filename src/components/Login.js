import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

function Login(props) {
    let navigate=useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault();
    const host = "http://localhost:4000";
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:credentails.email, password:credentails.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authtoken)
        props.showalert('Loged in Successfully','success')
        navigate('/')
    }else{
       props.showalert('Invalid Details','danger')
    }
  };

  const [credentails, setcredentails] = useState({email:'',password:''});

  const onchange = (e) => {
    setcredentails({ ...credentails, [e.target.name]: e.target.value });
  };
  const gosignup=()=>{
    navigate('/signup')
  }
  return (
    <div className="login-container">
        <h2 className="login-heading">Login</h2>
    <div className="container mt-2">
      <form onSubmit={handlesubmit}>
        <div className=" mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={credentails.email}
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onchange}
          />
          <div id="email" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentails.password}
            className="form-control"
            name="password"
            id="password"
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button onClick={gosignup} className="btn btn-primary my-2 mx-2">Don't have an account</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
