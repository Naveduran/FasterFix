import React from 'react';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const url = `http://localhost:8000/api/all/seller/:id`
const user_type = `datetime`

export default class Tech extends React.Component {
  state = {
    cases: []
  }
  componentDidMount() {
    axios.get(url + user_type)
      .then(res => {
        const cases = res.data;
        this.setState({ cases });
      })
  }
  render() {
    return (
        <div className="flex flex-col space-y-10 p-9">
            <div>
            <Fab color="primary" aria-label="add">
                <ArrowBackIosNewIcon />
            </Fab>
            </div>
            <div className="flex flex-col space-y-9 items-center justify-center">
                <h1>
                    Diagnose
                </h1>
                <div className="flex justify-center items-center ">
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-29 sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-red-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-2">
                            <thead className="bg-blue-400"></thead>
                              <tr>
                                <th 
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Case(id)</th>
                                <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Product(name)</th>
                                <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Motive</th>
                              </tr>
                              <tr>
                                <td className="px-3 py-4 whitespace-nowrap">idnumber</td>
                                <td className="px-3 py-4 whitespace-nowrap">productname</td>
                                <td className="px-3 py-4 whitespace-nowrap">details</td>
                              </tr>
                            </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="space-y-9">
                    
                    <InputLabel id="demo-simple-select-standard-label">Next action</InputLabel>
                    <Select
                      id="next_action"
                      label="NextAction"
                    >
                      <MenuItem value={10}>Get spare parts</MenuItem>
                      <MenuItem value={20}>Deny warranty</MenuItem>
                      <MenuItem value={30}>Send repaired product</MenuItem>
                    </Select>
                      <TextField id="action_note" label="Results:" multiline rows={2} variant="standard"/>
                      <div className="space-x-3">
                        <Button variant="contained">Detailed View</Button>
                        <Button variant="contained">Diagnosed</Button>
                      </div>
                </FormControl>
            </div>
        </div>
    </div>
)}}