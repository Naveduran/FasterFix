import * as React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default class Action extends React.Component {
  state = {
    currentCase: null,
    action: "",
    notes: "",
    openPopUp: false,
    permissions: [],
    choices: [],
    next: "",
    redirect: null
  };

  getLocalStorage() {
    this.request_id = localStorage.getItem("current_case");
    this.user_type= localStorage.getItem("user_type")
    this.token = `JWT ${localStorage.getItem("token")}`;
  }

  componentDidMount() {
    this.getLocalStorage();
    this.getCase();
    this.getUserPermissions();
    this.getChoices();
  }

  getUserPermissions() {
    axios.get(`http://localhost:8000/api/permissions/` + this.user_type, { headers: {Authorization: this.token} })
      .then((res) => {
        const { permissions } = res.data;
        this.setState({ ...this.state, permissions });
      });
    }

  getCase() {
    axios.get(`http://localhost:8000/api/case/` + this.request_id, { headers: {Authorization: this.token} }).then((res) => {
      const currentCase = res.data.pop();
      this.setState({ ...this.state, currentCase });
    });
  }

  getChoices(event) {
    axios.get(`http://localhost:8000/api/choices/` + this.user_type, { headers: {Authorization: this.token} }).then((res) => {
      const { choices } = res.data;
      this.setState({ ...this.state, choices });
    });
  }

  handleAction(event) {
    const action = event.target.value;
    this.setState({ ...this.state, action });
  }

  handleNext(event) {
    const next = event.target.value;
    this.setState({ ...this.state, next });
  }

  handleNotes(event) {
    const notes = event.target.value;
    this.setState({ ...this.state, notes });
  }

  createAction(event) {
    const { currentCase, action, notes } = this.state;
    console.log(currentCase, action, notes);
    const openPopUp = true;
    this.setState({ ...this.state, openPopUp });
  }

  handleClose(event) {
    const openPopUp = false;
    this.setState({ ...this.state, openPopUp });
    this.setState({ ...this.state,  redirect: "/done/"});
  }
  
  render() {
    
    const { currentCase, action, next, notes, openPopUp, permissions, choices } = this.state;
    if (currentCase === null ) {
        return <Box xs={{ display:'flex' }}><CircularProgress /></Box>
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div className="flex flex-col md:mx-2 lg:mx-7">
        
        <div className="flex justify-end">

        </div>
        <h2>{currentCase?.next}</h2>
        <div className="flex flex-col md:flex-row justify-center mx-auto lg:gap-x-10 lg:gap-x-10 mt-4">
          <div className="overflow-hidden border-b sm:rounded-lg">
            <table className=" mx-auto w-10/12 md:w-72">
                  <tr>
                    <td className="py-1 ml-2  font-normal text-black ">Case</td>
                    <td className="py-1 ml-2 font-normal text-gray-500 text-center">{currentCase?.id}</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-2  font-normal text-black">Product</td>
                    <td className="py-1 ml-2 font-normal text-gray-500 text-center">{currentCase?.product?.id}</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-2 font-normal text-gray-500">Name</td>
                    <td className="py-1 ml-2 font-normal text-gray-500 text-center">{currentCase?.product?.name}</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-2  font-normal text-black">Customer</td>
                    <td className="py-1 ml-2 font-normal text-gray-500 text-center">{currentCase?.customer?.name}</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-2  hidden font-normal text-gray-500">DNI</td>
                    <td className="py-1 ml-2  hidden font-normal text-gray-500 text-center">{currentCase?.customer?.id}</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-2 font-normal text-gray-500">Phone</td>
                    <td className="py-1 ml-2 font-normal text-gray-500 text-center">{currentCase?.customer?.phone}</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-2 font-normal text-gray-500">Adress</td>
                    <td className="py-1 ml-2 font-normal text-gray-500 text-center">{currentCase?.customer?.adress}</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-2 font-normal text-gray-500">City</td>
                    <td className="py-1 ml-2 font-normal text-gray-500 text-center">{currentCase?.customer?.city}</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-2  font-normal text-black">Bill</td>
                    <td className="py-1 ml-2 font-normal text-gray-500 text-center">{currentCase?.purchase?.id}</td>
                  </tr>
                  <tr>
                    <td className="py-1 ml-2 font-normal text-gray-500">Date</td>
                    <td className="py-1 ml-2 font-normal text-gray-500 text-center">{new Date(currentCase?.purchase?.datetime).toLocaleDateString(
                            "en-US",
                            this.options
                          )} </td>
                  </tr>
              </table>
          </div>
          
          <div className="justify-center items-center flex-col mx-auto md:w-auto lg:w-120 mt-5 md:mt-0 ">
            <div className="flex flex-col">
              <div className="-my-2  ">
                <div className="">
                  <div className="shadow overflow-hidden border-b border-red-200 sm:rounded-lg">
                    <table className="divide-y divide-gray-2 w-full ">
                    <thead className="bg-blue-400"></thead>
                    <tr>
                      <th scope="col" className="px-2 py-2 hidden lg:text-lg font-bold text-gray-600 tracking-wider text-center">
                        History
                      </th>
                    </tr>
                    {currentCase?.actions?.map((act, index) => (
                        <tr key={index}>
                        <td className="px-2 py-1 hidden whitespace-nowrap">
                          <div className="flex items-center">
                              <div className="text-gray-500 font-normal">{act?.action}</div>
                          </div>
                        </td>
                        <td className="px-2 py-1 hidden whitespace-nowrap">
                          <div className="text-gray-500">{new Date(act?.datetime).toLocaleDateString(
                            "en-US",
                            this.options
                          )}</div>
                        </td>

                        <td className="px-2 py-1 hidden whitespace-nowrap text-gray-500">{act?.note}</td>
                      </tr>
                    ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          <div className="flex flex-col space-y-2">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="space-y-2">
              <InputLabel id="action-label">
                Mark as
              </InputLabel>
              <Select
                id="action"
                value={action}
                onChange={this.handleAction.bind(this)}
                labelId="action-label"
                label="Action"
                className="pt-2"
              >
              {permissions.map((permission, index) => (
              <MenuItem key={index} value={index}>
                {permission}
                </MenuItem>
              ))}
              </Select>
               <TextField
                  id="action_note"
                  label="Notes:"
                  multiline
                  rows={2}
                  variant="standard"
                  value={notes}
                  onChange={this.handleNotes.bind(this)}
                />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="space-y-2"
            >
              <InputLabel id="next-label">
                Assign to
              </InputLabel>
              <Select
                id="next"
                value={next}
                onChange={this.handleNext.bind(this)}
                label="Next"
                labelId="next-label"
                className="py-2"
              >
              {choices.map((choice, index) => (
                <MenuItem key={index} value={index}>
                  {choice}
                </MenuItem>
              ))}
              </Select>
              <Button
                variant="contained"
                onClick={this.createAction.bind(this)}
              >
              Done!
              </Button>
            </FormControl>    
            <Modal
              open={openPopUp}
              onClose={this.handleClose.bind(this)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Success!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  The case have been saved in the database.
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
