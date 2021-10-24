import { CircularProgress } from "@material-ui/core";
import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { LoginLogo } from '../../components/loginLogo/LoginLogo';
import { AuthContext } from '../../context/authContext/AuthContext';
import './login.css';

export const Login = () => {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(AuthContext);

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
