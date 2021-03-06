import React from 'react';
import axios from 'axios';
import SimpleBottomNavigation from '../components/navigation';
import TableRow from '../components/tableRows';
import Tabletittle from '../components/tableTitles';
const url = `http://localhost:8000/api/all/active/`
const user_type = `datetime`

export default class AllActive extends React.Component {
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
      <div className="flex flex-col space-y-14 pt-14">
        <div>
          <SimpleBottomNavigation/>
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
                        <Tabletittle value="Next"/>
                        <Tabletittle value="Assigned on"/>
                        <Tabletittle/>
                      </tr>
                        { this.state.cases.map((c, index) => 
                          <tr key={index}>
                            <TableRow value={c.id}/>
                            <TableRow value={c.product.name}/>
                            <TableRow value={c.next}/>
                            <TableRow value={c.last_update}/>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button 
                              href="/active/:agent_id/:request_id:"
                              className="rounded-lg px-2 bg-white border-4 text-blue-600 border-blue-200">Change Path</button></td>
                            </tr>)}
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
