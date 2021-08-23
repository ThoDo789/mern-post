import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "../layouts/AlertMessage";
const RegisterForm = () => {
  const [registerForm, setRegisterForm] = useState({username:'', password:'', confirmPassword:''});
  const {username, password,confirmPassword} = registerForm;
  const [alert, setAlert] = useState(null);
  

  const onChangeRegisterForm = event =>{
    setRegisterForm({...registerForm, [event.target.name]:event.target.value})
  }
  // context
  const {registerUser} = useContext(AuthContext)
  const register = async(event)=>{
    event.preventDefault();
   if(password!==confirmPassword){
    setAlert({type:'danger',message:'passwords do not match'})
    setTimeout(()=>{
      setAlert(null)
    },4000)
   }
    const registerData = await registerUser(registerForm)
    console.log(registerData)
    try {
      const registerData = await registerUser(registerForm)
      console.log(registerData)
      if(registerData.success){
        // history.push('/dashboard')
      }else{
        setAlert({type:"danger",message:registerData.message})
        setTimeout(()=>{setAlert(null)},[3000])
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Form className="my-4"onSubmit={register}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={onChangeRegisterForm}
            value={username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={onChangeRegisterForm}
            value={password}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
              onChange={onChangeRegisterForm}
            value={confirmPassword}
          />
          
        </Form.Group>
        <AlertMessage info={alert}/>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already an account?{" "}
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
  