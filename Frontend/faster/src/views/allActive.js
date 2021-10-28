import React from 'react';
import axios from 'axios';

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
      <table>
      <tr>
        <th>Case</th>
        <th>Product</th>
        <th>Next</th>
        <th>Assigned on</th>
        <th></th>
      </tr>
        { this.state.cases.map(c => <tr><td>{c.id}</td><td>{c.product.name}</td><td>{c.next}</td><td>{c.last_update}</td><td><button>Change Path</button></td></tr>)}
      </table>
    )
  }
}
