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


const request_id = localStorage.getItem("current_case");

const user_type= localStorage.getItem("user_type")
const token = `JWT ${localStorage.getItem("token")}`


console.log(token)

export default class Action extends React.Component {
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
      <div className="flex flex-col m-3">
        <div className="flex justify-end">
          <Fab color="primary" aria-label="add">
            <ArrowBackIosNewIcon />
          </Fab>
        </div>    
      {this.state.cases.map(c =>
        <div>
        <h1>{c.action_next}</h1>
        <div className="flex justify-center mx-auto gap-x-20 mt-12 gap-y-4">
          <div>
            <table className="divide-y divide-gray-2 space-y-4">
                <p>Case</p>
                  <tr>
                    <td>Id</td>
                    <td>{c.id}</td>
                  </tr>
                <p>Product</p>
                  <tr>
                    <td>Reference</td>
                    <td>{c.product.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{c.product.name}</td>
                  </tr>
                <p>Customer</p>
                  <tr>
                    <td>Name</td>
                    <td>{c.customer.name}</td>
                  </tr>
                  <tr>
                    <td>DNI</td>
                    <td>{c.customer.id}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{c.customer.phone}</td>
                  </tr>
                  <tr>
                    <td>Adress</td>
                    <td>{c.customer.adress}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{c.customer.city}</td>
                  </tr>
                <p>Billing</p>
                  <tr>
                    <td>Bill</td>
                    <td>{c.purchase.id}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{c.purchase.datetime}</td>
                  </tr>
              </table>
            </div>
          <div className="flex justify-center items-center flex-col space-y-9">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-29 sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-red-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-2">
                    <thead className="bg-blue-400"></thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                      >
                        History
                      </th>
                      <th/>
                      <th/>
                    </tr>
                    {c.actions.map(act =>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                              <div className="text-sm text-black">{act.action}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">{act.datetime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{act.note}</td>
                      </tr>
                    )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
        <div >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="space-y-4">
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
      )}
    </div>
    )
  }
}
