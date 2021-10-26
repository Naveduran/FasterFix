import * as React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Register() {
  const [role, setRole] = React.useState('Client Service Agent');
  const handleChange = (event) => { setRole(event.target.value); };
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
  console.log("perrito")

	return (
    <div class="w-screen h-screen p-2">
    <div class="flex flex-col space-y-1 items-center"> <h1>FASTER FIX</h1>
    <div class="text-justify space-y-1 pt-9"> <h2>Register</h2>
    <Box component="form"
    sx={{ '& .MuiTextField-root': { mx: "center", my: 2, width: '100%' } }}
    noValidate autoComplete="off">
      <div>
        <TextField id="Name" label="Name" color="secondary"
        variant="standard" />
      </div>
      <div>
        <TextField id="Email" label="Email" color="secondary"
        variant="standard" />
      </div>
      <div>
        <TextField id="Password" label="Password" type="password"
        autoComplete="current-password" color="secondary" variant="standard"
        helperText="At least 8 uppercase and lowercase letters" />
      </div>
      <div>
        <TextField id="Role" select label="Position at the company" value={role}
        onChange={handleChange} color="secondary" variant="standard">
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div class="flex flex-col space-y-1 items-center">
        <Button variant="contained" endIcon={<SendIcon />}>Send</Button>
      </div>
    </Box>
    </div></div></div>
  );
}
