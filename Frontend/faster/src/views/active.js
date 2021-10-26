import React from 'react';
import axios from 'axios';

export default class Active extends React.Component {
  state = {
    cases: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/active/casher`)
      .then(res => {
        const cases = res.data;
        this.setState({ cases });
      })
  }

  render() {
    return (
      <table>
      <tr>
        <th>Case(id)</th>
        <th>Product(name)</th>
        <th>Assigned on </th>
        <th></th>
      </tr>
        { this.state.cases.map(c => <tr><td>{c.id}</td><td>{c.product.name}</td><td>{c.last_update}</td><td><button>{c.next}</button></td></tr>)}
      </table>
    )
  }
}
