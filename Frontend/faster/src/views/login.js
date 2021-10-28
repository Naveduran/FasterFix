import React, { Component } from 'react';
import { Redirect } from 'react-router';
import LoginForm from '../components/LoginFormat';
import axios from 'axios';


class LoginPage extends Component {

  state = {
    status: 1,
    token: 'JWT '
  }
    obtain = () => {
    let email_login = document.getElementById('email_login').value
    let password_login = document.getElementById('password_login').value
    axios.post('http://localhost:8000/api/token/obtain', {
      email: email_login,
      password: password_login
    })
    .then((response) => {
      console.log(response.data.access);
      window.location.href = `/active?token=${response.data.access}`;
    }, (error) => {
      alert('Icorrect email or password');
    });

    this.setState({status: 0})
  }
  render(){

  
  return (<div>
    
    {this.state.status ? <LoginForm obj={this.obtain}/> : <h1>Status: {this.state.status}</h1>}
    
    
  </div>
  );
  }
}
export default LoginPage;



// ---------------------- OPTION 1 ---------------------------------------------///////
/*
import React, { Component } from 'react';
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
      console.log(response);
    }, (error) => {
      alert('Icorrect email or password');
    });

    this.setState({ status: 0})
  }
  render(){

  
  return (<div>
    
    {this.state.status ? <LoginForm obj={this.obtain}/> : <h1>No active</h1>}
    
    
  </div>
  );
  }
}
export default LoginPage;
*/
// ----------------------------------------------------------------------------------//