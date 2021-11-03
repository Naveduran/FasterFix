import React from 'react';
import axios from 'axios';
import { getToken, getUserType } from '../views/landing';
import SimpleBottomNavigation from '../components/navigation';

const url = `http://localhost:8000/api/done/`
const agent_id = `2`
const token = `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM1OTA4NTA1LCJpYXQiOjE2MzU5MDgyMDUsImp0aSI6IjNiNThkOWM5YjRlZTRlM2Q4YmMyNmNiMWY2ZTUxZDg2IiwidXNlcl9pZCI6MTAsInVzZXJfdHlwZSI6ImNzYSJ9.udV5x05CkmJrSvkjCFiepJyM6-iZJeub_l_apLV9LmE`
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
                  <table>
                    <tr>
                      <th>Case</th>
                      <th>Product</th>
                      <th>Assigned</th>
                      <th>Next</th>
                      <th></th>
                    </tr>
                    {this.state.cases.map(c => <tr><td>{c.request}</td><td>{c.product}</td><td>{c.datetime}</td><td>{c.next}</td><td><button>Details</button></td></tr>)}
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

