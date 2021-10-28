import React from 'react';
import axios from 'axios';

const url = `http://localhost:8000/api/all/done/`
const user_type = `datetime`

export default class AllDone extends React.Component {
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
        <th>Closed</th>
        <th>Time</th> {/* Number of days to solve the case*/}
        <th></th>
      </tr>
        { this.state.cases.map(c => <tr><td>{c.id}</td><td>{c.product.name}</td><td>{c.last_update}</td><td>{ c.last_update - c.datetime }</td><td><button>Detailed View</button></td></tr>)}
      </table>
    )
  }
}
