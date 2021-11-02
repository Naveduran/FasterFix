import React from 'react';
const url = `http://localhost:8000/api/all/`
export default class  ProductDetails extends React.Component {
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