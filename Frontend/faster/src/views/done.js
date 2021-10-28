import React from 'react';
import axios from 'axios';

const url = `http://localhost:8000/api/done/`
const agent_id = `5`

export default class Done extends React.Component {
  state = {
    cases: []
  }

  componentDidMount() {
    axios.get(url + agent_id)
      .then(res => {
        const cases = res.data;
        this.setState({ cases });
      })
  }

  render() {
    return (
      <table>
        <tr>
          <th>Case</th>
          <th>Product</th>
          <th>Assigned</th>
          <th>Next</th>
          <th></th>
        </tr>
        { this.state.cases.map(c => <tr><td>{c.request}</td><td>{c.product}</td><td>{c.datetime}</td><td>{c.next}</td><td><button>Details</button></td></tr>)}
      </table>
    )
  }
}

