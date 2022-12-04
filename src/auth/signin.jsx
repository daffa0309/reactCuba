import React,{useState,useEffect} from 'react';
import man from '../assets/images/dashboard/profile.jpg';
import {Container,Row,Col,Form,FormGroup,Input,Label,Button} from 'reactstrap'
// import {firebase_app,googleProvider,facebookProvider,githubProvider, Jwt_token } from '../data/config'
// import { handleResponse } from '../services/fack.backend'
// import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify';
import {withRouter} from 'react-router-dom'
// import { Facebook, GitHub} from 'react-feather'
import {Password, Username,RememberPassword,ForgotPassword,LoginWithJWT } from '../constant';

const Logins = (props) => {
  
    const [username, setUsername] = useState("test123");
    const [password, setPassword] = useState("test123");
    const [togglePassword,setTogglePassword] = useState(false)

    const [value, setValue] = useState(
        localStorage.getItem('profileURL' || man)
    );
    const [name, setName] = useState(
        localStorage.getItem('Name')
    );

    useEffect(() => {
      
    localStorage.setItem('profileURL', value);
    localStorage.setItem('Name', name);
    }, [value,name]);

    const Auth = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
        const response = await fetch('http://localhost:8080/api/v2/login', requestOptions);
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            localStorage.setItem('roleId', data.roleId);
            window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/`
            setValue(man)

        }
        else{
          setTimeout(() => {
                  toast.error("Oppss.. The password is invalid or the user does not have a password.");
                }
                , 200);        }
        return data;


    }
    // const loginWithJwt = (username,password) => {

    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: ({ username, password })
    //   };
    //   return fetch('http://localhost:8080/api/v2/login', requestOptions)
    //   .then(handleResponse)
    //   .then(user => {
    //     console.log(user);
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     setValue(man);
    //     console.log("result", user);
    //     setName("Emay Walter");
    //     localStorage.setItem('token', user);
    //     window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/`
    //     return user;
    //   },error => {
    //     console.log(error);
    //     setTimeout(() => {
    //       toast.error("Oppss.. The password is invalid or the user does not have a password.");
    //     }
    //     , 200);
    //   });
    // }

    return (
        <Container fluid={true} className="p-0">
        <Row>
        <Col xs="12">     
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="index.html">
                  <img className="img-fluid for-light" src={require("../assets/images/logo/login.png")} alt=""/>
                  <img className="img-fluid for-dark" src={require("../assets/images/logo/logo_dark.png")} alt=""/>
                </a>
              </div>
              <div className="login-main login-tab"> 
            
                    <Form onSubmit={Auth} className="theme-form">
                      <p>{"Enter your username & password to login"}</p>
                      <FormGroup>
                        <Label className="col-form-label">{Username}</Label>
                        <Input className="form-control" type="text" required="" onChange={e => setUsername(e.target.value)} defaultValue={username} />
                      </FormGroup>
                      <FormGroup>
                        <Label className="col-form-label">{Password}</Label>
                        <Input className="form-control" type={togglePassword ?  "text" : "password"} onChange={e => setPassword(e.target.value)} defaultValue={password} required=""/>
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </FormGroup>
                      <div className="form-group mb-0">
                        <div className="checkbox ml-3">
                          <Input id="checkbox1" type="checkbox"/>
                          <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                        </div><a className="link" href="#javascript">{ForgotPassword}</a>
        
                        <Button color="primary" className="btn-block">{LoginWithJWT}</Button>
                        
                      </div>
         
                    </Form>
            
              </div>
            </div>
          </div>
        </Col>
        </Row>
        </Container>
    );
}

export default withRouter(Logins);