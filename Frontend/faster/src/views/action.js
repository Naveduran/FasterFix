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
import Typography from '@mui/material/Typography';

import { Box } from '@mui/system';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const request_id = 5;

//const user_type= localStorage.getItem("user_type")
const token = `JWT ${localStorage.getItem("token")}`


console.log(token)

export default class Action extends React.Component {
  state = {
    currentCase: null,
    nextAction: '',
    notes: '',
    openPopUp: false,
    permissions: ['Diagnose', 'Repair'], //
  }

  componentDidMount() {
    this.getCase();
    this.getUserPermissions();
  }

  getUserPermissions() {
    //   axios.get(`http://localhost:8000/api/permissions/` + request_id)
    //    .then(res => {
    //      const permissions = res.data;
    //      this.setState({ ...this.state, permissions });
    //    })
      }

      getCase() {
        axios.get(`http://localhost:8000/api/case/` + request_id)
          .then(res => {
            const currentCase = res.data.pop();
            this.setState({ ...this.state, currentCase });
          })
      }
    
      handleNextAction(event) {
        const nextAction = event.target.value;
        this.setState({ ...this.state, nextAction });
      }
    
      handleNotes(event) {
        const notes = event.target.value;
        this.setState({ ...this.state, notes });
      }
    
      createAction(event) {
        const { currentCase, nextAction, notes } = this.state;
        console.log(currentCase, nextAction, notes);
        const openPopUp = true;
        this.setState({ ...this.state, openPopUp });
      }
    
      handleClose(event) {
        const openPopUp = false;
        this.setState({ ...this.state, openPopUp });
      }
    
  render() {
    const { currentCase, nextAction, notes, openPopUp } = this.state;
    return (
      <div className="flex flex-col m-3">
        <div className="flex justify-end">
          <Fab color="primary" aria-label="add">
            <ArrowBackIosNewIcon />
          </Fab>
        </div>    
        <div>
        <h2>{currentCase?.next}</h2>
        <div className="flex justify-center mx-auto gap-x-20 mt-12 gap-y-4">
          <div>
            <table className="divide-y divide-gray-2 space-y-4">
                <p>Case</p>
                  <tr>
                    <td>Id</td>
                    <td>{currentCase?.id}</td>
                  </tr>
                <p>Product</p>
                  <tr>
                    <td>Reference</td>
                    <td>{currentCase?.product?.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{currentCase?.product?.name}</td>
                  </tr>
                <p>Customer</p>
                  <tr>
                    <td>Name</td>
                    <td>{currentCase?.customer?.name}</td>
                  </tr>
                  <tr>
                    <td>DNI</td>
                    <td>{currentCase?.customer?.id}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{currentCase?.customer?.phone}</td>
                  </tr>
                  <tr>
                    <td>Adress</td>
                    <td>{currentCase?.customer?.adress}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{currentCase?.customer?.city}</td>
                  </tr>
                <p>Billing</p>
                  <tr>
                    <td>Bill</td>
                    <td>{currentCase?.purchase?.id}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{currentCase?.purchase?.datetime}</td>
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
                    {currentCase?.actions?.map((act, index) =>
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                              <div className="text-sm text-black">{act?.action}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">{act?.datetime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{act?.note}</td>
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
            value={nextAction}
            onChange={this.handleNextAction.bind(this)}
            label="NextAction"
          >
            <MenuItem value={10}>Get spare parts</MenuItem>
            <MenuItem value={20}>Deny warranty</MenuItem>
            <MenuItem value={30}>Send repaired product</MenuItem>
          </Select>
          <TextField id="action_note" label="Notes:"
          multiline rows={2} variant="standard"
          value={notes}
          onChange={this.handleNotes.bind(this)}
          />
          <Button variant="contained" onClick={this.createAction.bind(this)}>Done!</Button>
        </FormControl>
        </div>
        </div>
        </div>
        </div>

      <Modal
        open={openPopUp}
        onClose={this.handleClose.bind(this)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            { currentCase?.id } { nextAction } { notes }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
    )
  }
}
