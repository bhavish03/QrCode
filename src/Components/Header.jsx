import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = ({ props }) => {
  const [userdata, setUserdata] = useState(null);
  let token = localStorage.getItem("token");

  const navigate = useNavigate();
  async function userData1() {
    const res = await fetch("https://qr-code-6ey1.onrender.com/user/profile", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`,
      },
    });
    const result = await res.json();
    if (!result.success) {
      // window.alert(result.message);
      console.log(result);
    } else {
      // let data = JSON.parse(result.payload);
      // console.log( result.payload.name);

      setUserdata(result.payload.name);
      // console.log("Homepage------",userdata);
    }
  }
  useEffect(() => {
    if(token){
      userData1();
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setUserdata(null);
    navigate('/');

  }

  return (
    <div>
     
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Rasonix</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>Home</Nav.Link>
              <NavDropdown title={userdata ? userdata : 'Profile'} id="navbarScrollingDropdown">
                {userdata ? (
                  <NavDropdown.Item onClick={handleLogout}>
                    <NavLink
                      style={{ textDecoration: "none", color: "black" }}
                      
                    >
                      Logout
                    </NavLink>
                  </NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <NavLink
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/login"}
                      >
                        Login
                      </NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <NavLink
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/signup"}
                      >
                        signUp
                      </NavLink>
                    </NavDropdown.Item>
                  </>
                )}

                
                
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
