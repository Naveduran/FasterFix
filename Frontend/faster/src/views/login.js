import React, { Component } from 'react';
import jwt from 'jwt-decode'
import LoginForm from '../components/LoginFormat';
import axios from 'axios';
class LoginPage extends Component {
  state = {
    status: 1
  }
    obtain = () => {
    let email_login = document.getElementById('email_login').value
    let password_login = document.getElementById('password_login').value
    axios.post('http://localhost:8000/api/token/obtain', {
      email: email_login,
      password: password_login
    })
    .then((response) => {
      console.log(jwt(response.data.access));
      let token = response.data.access
      let user_type = jwt(response.data.access)['user_type']
      let agent_id = jwt(response.data.access)['user_id']
      localStorage.setItem("token", token);
      localStorage.setItem("agent_id", agent_id);
      localStorage.setItem("user_type", user_type);
      window.location.href = `/active`;
    }, (error) => {
      alert('Icorrect email or password');
      window.location.href = `/login`
    });
    this.setState({status: 0})
  }
  render(){

  
  return (<div>
    
    {this.state.status ? <LoginForm obj={this.obtain}/> : <h1>WAIT...</h1>}
    
    
  </div>
  );
  }
}
export default LoginPage;
