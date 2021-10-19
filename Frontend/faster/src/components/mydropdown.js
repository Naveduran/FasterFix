import React from "react";

class MyDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '/'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    
    event.preventDefault();
  }
  
  render() {
    const data1=[
        {name: 'Money Back', value: 'True'}, {name: 'Redeemeable', value:'False'}]
    return (
        <form onSubmit={this.handleSubmit}>
            <div class="flex flex-col justify-center space-y-7">
            <div class="">
            <select value={this.state.value} onChange={this.handleChange} class="border border-gray-300 rounded-2xl text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 "> 
            <option selected >Select an Option</option>
            <option value={`${data1.value}`}>{`${data1.name}`}</option>
            </select>
            </div>
            </div>
        </form>
      );
    }
  }
  export default MyDropdown;