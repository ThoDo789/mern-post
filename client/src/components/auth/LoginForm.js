import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({username:'', password:''});
  const {username, password} = loginForm;
  const history = useHistory();
  const onChangeLoginForm = event =>{
    setLoginForm({...loginForm, [event.target.name]:event.target.value})
  }
  // context
  const {loginUser} = useContext(AuthContext)
  const login = async(event)=>{
    event.preventDefault();
   
    const loginData = await loginUser(loginForm)
    console.log(loginData)
    try {
      const loginData = await loginUser(loginForm)
      console.log(loginData)
      if(loginData.success){
        history.push('/dashboard')
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?{" "}
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
