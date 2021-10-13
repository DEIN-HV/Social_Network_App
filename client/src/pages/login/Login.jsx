import React, { useContext, useRef, useState } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import { CircularProgress } from "@material-ui/core";
import './login.css';
import { LoginLogo } from '../../components/loginLogo/LoginLogo';
import { Redirect, useHistory } from 'react-router-dom';

export const Login = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatch, user, isFetching } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        loginCall({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }, dispatch)
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <LoginLogo />

                <div className="loginForm">
                    <form className="loginBox" onSubmit={handleLogin}>
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={emailRef}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            minLength="3"
                            className="loginInput"
                            ref={passwordRef}
                        />
                        <button className="loginButton" type="submit">
                            {isFetching
                                ? <CircularProgress color="white" size="30px" />
                                : "Login"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={() => history.push("/register")}>
                            Create a new account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
