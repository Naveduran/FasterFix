import React from 'react';
import axios from 'axios';
const url = `http://localhost:8000/api/all/seller/:id`
const user_type = `datetime`

export default class Seller extends React.Component {
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
        <div>

        </div>
    )
}
}