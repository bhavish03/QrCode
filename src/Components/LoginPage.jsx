import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleEmail(e) {
        
        setEmail(e.target.value);
        console.log(email);
    }   
    function handlePassword(e) {
        setPassword(e.target.value);
        
    }
    async function handleSubmit(e) { 
        
        e.preventDefault();
        const data = {
           
            email:email,
            password:password,
            
        }
        
        const res = await fetch("https://qr-code-6ey1.onrender.com/user/signIn", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                ...data
            })
        })
        const result = await res.json()
        if (!result.success ) {
            window.alert(result.message)
            console.log(result);
        }else{
            
            localStorage.setItem('token', result.payload.loginToken)
            window.alert(result.message)
            navigate('/');
            
        }
    }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmail}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
