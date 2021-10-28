import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StoreIcon from '@mui/icons-material/Store';
import CheckIcon from '@mui/icons-material/Check';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

export default function Create() {

  return(
    <Box component="form"
    sx={{ '& .MuiTextField-root': { mx: "center", my: 0, width: '30%' } }}
    noValidate autoComplete="off">
      <div>
        <p>Product
        <TextField id="product_id" label="Reference" color="secondary"
        variant="standard" />
        <TextField id="product_name" label="Name" color="secondary"
        variant="standard" /></p>
      </div>
      <div>
      <p>Purchase
        <TextField id="purchase_id" label="Bill" color="secondary"
        variant="standard" />
        <TextField id="purchase_datetime" label="Date" color="secondary"
        variant="standard" /></p>
      </div>
      <div>
        <p>Customer
        <TextField id="customer_id" label="DNI" color="secondary"
        variant="standard" />
        <TextField id="customer_name" label="Name" color="secondary"
        variant="standard" />
        <TextField id="customer_phone" label="Phone" color="secondary"
        variant="standard" />
        <TextField id="customer_adress" label="Adress" color="secondary"
        variant="standard" />
        <TextField id="customer_city" label="City/State" color="secondary"
        variant="standard" /></p>
      </div>
      <div>
      <p>Request
        <TextField id="request_motive" label="Motive" multiline rows={4}
        variant="standard" color="secondary" />
      </p>
      </div>
      <div class="flex flex-col space-y-1 items-center">
        <Button id="create_and_store" variant="contained" endIcon={<StoreIcon />}>Request Storaging</Button>
        <Button id="create_and_pickup" variant="contained" endIcon={<LibraryAddCheckIcon />}>Request PickUp</Button>
        <Button id="create_and_spares" variant="contained" endIcon={<CheckIcon />}>Request Spares</Button>
      </div>
    </Box>
  )
}