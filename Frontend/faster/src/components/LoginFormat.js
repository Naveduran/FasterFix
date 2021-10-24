import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginForm extends Component() {
    state = {
        email: '',
        password: ''
      };
      handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
        const newState = { ...prevstate };
        newState[name] = value;
        return newState;
        });
      };
      render() {
        return(
        <div class="flex h-screen items-center bg-gray-100 justify-center">
            <div class="w-auto h-auto bg-loginColor p-9 text-center shadow-2xl rounded-3xl">
            <h1 class="m-3 text-5xl italic">
                Faster Fix
            </h1>
            <p>
                Warranties Manager System
            </p>
            <form onSubmit={e => this.props.handle_login(e, this.state)}>
                <label htmlFor="email" class="flex gap-x-11 my-6">
                    <p>
                        Email:
                    </p>
                    <input 
                        name="email"
                        value={this.state.email}
                        onChange={this.handle_change}
                        type="text"
                        class="mx-2 border-2 rounded-lg"/>
                </label>
                <label class="flex gap-x-3">
                    <p>
                        Password
                    </p>
                    <input type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handle_change}
                        class="mx-2 border-2 rounded-lg"/>
                </label>
                <div class="mt-7">
                    <button 
                    type="submit" 
                    class=" font-bold text-lg  bg-loginButton active:bg-colorBu py-1 px-4"
                    >Start
                    </button>
                </div>
            </form>
            </div>
        </div>
        )
  }
}
Login.propTypes = {
    handle_login: PropTypes.func.isRequired
};