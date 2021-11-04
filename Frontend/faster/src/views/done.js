import React from 'react';
import axios from 'axios';
import SimpleBottomNavigation from '../components/navigation';
import TableRow from '../components/tableRows';
import Tabletittle from '../components/tableTitles';

const url = `http://localhost:8000/api/done/`
const agent_id = localStorage.getItem("agent_id")
const token = `JWT ${localStorage.getItem("token")}`


export default class Done extends React.Component {
  state = {
    cases: []
  }

  componentDidMount() {
    axios.get(url + agent_id, { headers: { Authorization: token } })
      .then(res => {
        const cases = res.data;
        this.setState({ cases });
      })
  }

  render() {
    return (
      <div className="flex flex-col space-y-14 pt-14">
        <div>
          <SimpleBottomNavigation />
        </div>
        <div className="flex justify-center items-center ">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-29 sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-red-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-2">
                    <thead className="bg-blue-400"></thead>
                    <tr>
                      <Tabletittle value="Case(id)"/>
                      <Tabletittle value="Product(name)"/>
                      <Tabletittle value="Assigned on"/>
                      <Tabletittle value="Next"/>
                      <Tabletittle/>
                    </tr>
                    {this.state.cases.map((c, index) => <tr key={index}>
                      <TableRow value={c.request}/>
                      <TableRow value={c.product}/>
                      <TableRow value={c.datetime}/>
                      <TableRow value={c.next}/>
                      <td><button>Details</button></td></tr>)}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

