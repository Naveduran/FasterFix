import { Link } from "react-router-dom";
import React from "react";

class SelectDropdown extends React.Component {
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
    
    let match = this.state.value;
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="flex flex-col justify-center space-y-7">
          <div class="">
          
            <select value={this.state.value} onChange={this.handleChange} class="border border-gray-300 rounded-2xl text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 "> 
              <option selected >Choose an role</option>
              <option value="autorize">Storage Manager</option>
              <option value="autorize">Manager</option>
              <option value="accountant">Accountant</option>
              <option value="ActiveCSACases">Client Service Agent</option>
              <option value="technician">Technician</option>
              <option value="transport">Transport</option>
              <option value="detailed">Seller</option>
            </select>
          </div>
          <div>
            <Link to={`${match}`}>
              <input type="submit" value="Submit" class="transition ease-in-out font-serif duration-500  bg-buttoncolor hover:bg-buttonclick transform hover:-translate-y-1 hover:scale-110 rounded-lg py-1 px-2"/>
            </Link>
          </div>
        </div>
      </form>
      
    );
  }
}
export default SelectDropdown;