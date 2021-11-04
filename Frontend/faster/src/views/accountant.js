import * as React from 'react';
import axios from 'axios';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


const request_id = 5;

const token = `JWT ${localStorage.getItem("token")}`


console.log(token)

export default class Example extends React.Component {
  state = {
    cases: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/case/` + request_id, { headers: { Authorization: token } })
      .then(res => {
        const cases = res.data;
        this.setState({ cases });
      })
  }

  render() {
    return (
      <div className="flex flex-col m-3 md:mx-5 lg:mx-7">
        
        <div className="flex justify-end">
          <Fab color="primary" aria-label="add">
            <ArrowBackIosNewIcon />
          </Fab>
        </div>
        <h1>Action</h1>
        <div className="flex flex-col md:flex-row justify-center mx-auto gap-x-10 lg:gap-x-10 mt-12 gap-y-4">
          <div className="shadow overflow-hidden border-b sm:rounded-lg">
            <table className="divide-y divide-gray-3 mx-auto w-10/12 md:w-72">
                <p className="text-gray-600 font-bold py-1 lg:px-2">Case</p>
                  <tr className="py-1 px-2">
                    <td className="py-1 ml-1  font-normal text-gray-500 ">Id</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">IdNumber</td>
                  </tr>
                  <tr className="py-1">
                    <p className="text-gray-600 font-bold py-1">Product</p>
                  </tr>
                  <tr>
                    <td className="py-1 ml-1 font-normal text-gray-500">Reference</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">IdPr</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-1  font-normal text-gray-500">Name</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">cfaf</td>
                  </tr>
                  <tr className="py-1">
                    <p className="text-gray-600 font-bold py-1">Customer</p>
                  </tr>
                  <tr>
                    <td className="py-1 ml-1 font-normal text-gray-500">Name</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">afsadfas</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-1 font-normal text-gray-500">DNI</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">asdasdas</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-1 font-normal text-gray-500">Phone</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">asdasdasd</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-1 font-normal text-gray-500">Adress</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">asdasdasd</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-1 font-normal text-gray-500">City</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">asdasdasdasd</td>
                  </tr>
                  <tr className="py-1">
                    <p className="text-gray-600 font-bold py-1">Billing</p>
                  </tr>
                  <tr>
                    <td className="py-1 ml-1 font-normal text-gray-500">Bill</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">asdasdasd</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-1 font-normal text-gray-500">Date</td>
                    <td className="py-1 ml-1 font-normal text-gray-500">asdasdasd</td>
                  </tr>
              </table>
          </div>
          
          <div className="justify-center items-center flex-col space-y-9 mx-auto md:w-1/2 lg:w-96 mt-5 md:mt-0 ">
            <div className="flex flex-col">
              <div className="-my-2  ">
                <div className="">
                  <div className="shadow overflow-hidden border-b border-red-200 sm:rounded-lg">
                    <table className="divide-y divide-gray-2 w-full ">
                    <thead className="bg-blue-400"></thead>
                    <tr>
                      <th scope="col" className="px-6 py-3  lg:text-lg font-bold text-gray-700 uppercase tracking-wider text-center">
                        History
                      </th>
                     
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="text-gray-500 font-normal">idg</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">Date</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">Information</td>
                    </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        <div >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="space-y-4 w-full">
            <InputLabel id="demo-simple-select-standard-label">Next action</InputLabel>
            <Select
              id="next_action"
              //value={next_action}
              //onChange={handleNextChange}
              label="NextAction">
              <MenuItem value={10}>Get spare parts</MenuItem>
              <MenuItem value={20}>Deny warranty</MenuItem>
              <MenuItem value={30}>Send repaired product</MenuItem>
            </Select>
            <TextField id="action_note" label="Notes:" multiline rows={2} variant="standard"/>
            <Button variant="contained">Done!</Button>
          </FormControl>
        </div>
          </div>
        </div>
      </div>
    )
  }
}
