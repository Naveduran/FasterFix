import * as React from "react";
import axios from "axios";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  }

  render() {
    const { currentCase, action, next, notes, openPopUp, permissions, choices } = this.state;
    console.log('permissions', [ ...permissions ]);
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
                          <th />
                          <th />
                        </tr>
                        {currentCase?.actions?.map((act, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm text-black">
                                  {act?.action}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-black">
                                {act?.datetime}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                              {act?.note}
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                  className="space-y-4"
                >
                  <InputLabel id="action-label">
                    Mark as
                  </InputLabel>
                  <Select
                    id="action"
                    value={action}
                    onChange={this.handleAction.bind(this)}
                    labelId="action-label"
                    label="Action"
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
                  className="space-y-4"
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
              Success!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The case have been saved in the database.
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}
