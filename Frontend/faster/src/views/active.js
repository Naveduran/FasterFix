import React from "react";
import axios from "axios";
import SimpleBottomNavigation from "../components/navigation";
import TableRow from "../components/tableRows";
import Tabletittle from "../components/tableTitles";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const url = `http://localhost:8000/api/active/`;
const user_type = localStorage.getItem("user_type");
const token = `JWT ${localStorage.getItem("token")}`;

console.log(`from localstorage: ${localStorage.getItem("token")}`);
export default class Active extends React.Component {
  state = {
    cases: [],
  };

  componentDidMount() {
    this.options = {
      weekday: "short",
      year: "2-digit",
      month: "short",
      day: "numeric",
    };
    axios
      .get(url + user_type, { headers: { Authorization: token } })
      .then((res) => {
        const cases = res.data;
        this.setState({ cases });
      });
  }
  nextAction(id) {
    localStorage.setItem("current_case", id);
    window.location.href = "/action";
  }
  setList;
  render() {
    return (
      <div className="flex flex-col space-y-14 pt-14">
        <div>
          <SimpleBottomNavigation />
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-29 sm:px-6 lg:px-8 flex justify-center items-center">
                <div className="shadow overflow-hidden border-b border-red-200 sm:rounded-lg lg:w-4/5 ">
                <TableContainer component={Paper} className="w-screen">
                  <table className="min-w-full divide-y divide-gray-2">
                    <thead className="bg-blue-400"></thead>
                    <tr>
                      <th>Case</th>
                      <th>Product</th>
                      <th>Assigned on</th>
                      <th></th>
                    </tr>
                    {this.state.cases.map((c, index) => (
                      <tr key={index}>
                        <td className="px-1 py-4 whitespace-nowrap text-center"> {c.id} </td>
                        <td className="px-1 py-4 whitespace-nowrap text-center"> {c.product.name} </td>
                        <td className="px-1 py-4 whitespace-nowrap text-center"> {new Date(c.last_update).toLocaleDateString(
                            "en-US",
                            this.options
                          )} </td>
                        <td className="px-1 py-4 whitespace-nowrap">
                          <button
                            onClick={() => this.nextAction(c.id)}
                            className="rounded-lg px-0 bg-white border-4 text-blue-600 border-blue-200"
                          >
                            {c.next}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
