import React from 'react';
import axios from 'axios';
import SimpleBottomNavigation from '../components/navigation';
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
      <div class="flex flex-col space-y-14 pt-14">
        <div>
          <SimpleBottomNavigation/>
        </div>
        <div class="flex justify-center items-center ">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-29 sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-red-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-2">
                    <thead className="bg-blue-400"></thead>
          
                      <tr>
                        <th 
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Case(id)</th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product(name)</th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Next</th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Assigned on </th>
                        <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"/>
                      </tr>
                        { this.state.cases.map(c => 
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">{c.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{c.product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{c.next}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{c.last_update}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button 
                              href="/active/:agent_id/:request_id:"
                              class="rounded-lg px-2 bg-white border-4 text-blue-600 border-blue-200">Change Path</button></td>
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
