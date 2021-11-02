import React from 'react';

function LoginForm(props) {

        return(
        <div className="flex h-screen items-center bg-gray-100 justify-center">
            <div className="w-auto h-auto bg-loginColor p-9 text-center shadow-2xl rounded-3xl">
            <h1 className="m-3 text-5xl italic">
                Faster Fix
            </h1>
            <p>
                Warranties Manager System
            </p>
            <form>
                <label htmlFor="email" className="flex gap-x-11 my-6">
                    <p>
                        Email:
                    </p>
                    <input
                        id="email_login" 
                        name="email"
                        type="text"
                        className="mx-2 border-2 rounded-lg"/>
                </label>
                <label className="flex gap-x-3">
                    <p>
                        Password
                    </p>
                    <input type="password"
                        name="password"
                        id="password_login"
                        className="mx-2 border-2 rounded-lg"/>
                </label>
                <div className="mt-7">
                    <button
                    onClick={props.obj}
                    type="submit" 
                    className="font-bold text-lg bg-loginButton active:bg-colorBu py-1 px-4"
                    >Start
                    </button>
                </div>
            </form>
            </div>
        </div>
        )
}

export default LoginForm;
