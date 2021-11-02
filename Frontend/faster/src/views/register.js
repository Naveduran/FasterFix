import * as React from 'react';
import axios from 'axios'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';



export default function Register() {
  const [role, setRole] = React.useState('Client Service Agent');
  const handleChange = (event) => { 
    setRole(event.target.value);
  };
  const roles = [
    { value: 'csa', label: 'Client Service Agent', },
    { value: 'sender', label: 'Logistics Coordinator', },
    { value: 'author', label: 'Manager', },
    { value: 'sparer', label: 'Spares Keeper', },
    { value: 'storer', label: 'Storage Manager', },
    { value: 'tech', label: 'Technician', },
    { value: 'casher', label: 'Accountant', },
    { value: 'seller', label: 'Seller', },
  ];
  const register = () => {

    const credentials = {
      name: document.getElementById('name_register').value,
      email: document.getElementById('email_register').value,
      password: document.getElementById('password_register').value,
      user_type: role
    }
    axios.post('http://localhost:8000/api/create_agent', credentials)
    .then((response) => {
      console.log(response.data);
      alert('Register success')
      window.location.href = `/login`;
    }, (error) => {
      alert('Icorrect email, password or type');
    });
  }

	return (
    <div className="w-screen h-screen p-2">
    <div className="flex flex-col space-y-1 items-center"> <h1>FASTER FIX</h1>
    <div className="text-justify space-y-1 pt-9"> <h2>Register</h2>
    <Box component="form"
    sx={{ '& .MuiTextField-root': { mx: "center", my: 2, width: '100%' } }}
    noValidate autoComplete="off">
      <div>
        <TextField id="name_register" label="Name" color="secondary" onChange={handleChange}
        variant="standard" required/>
      </div>
      <div>
        <TextField id="email_register" label="Email" color="secondary" onChange={handleChange}
        variant="standard" required/>
      </div>
      <div>
        <TextField id="password_register" label="Password" type="password" onChange={handleChange}
        autoComplete="current-password" color="secondary" variant="standard"
        helperText="At least 8 uppercase and lowercase letters" required/>
      </div>
      <div>
        <TextField id="Role_register" select label="Position at the company" value={role}
        onChange={handleChange} color="secondary" variant="standard">
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="flex flex-col space-y-1 items-center">
        <Button variant="contained" endIcon={<SendIcon />} onClick={register}>Send</Button>
      </div>
    </Box>
    </div></div></div>
  );
}
