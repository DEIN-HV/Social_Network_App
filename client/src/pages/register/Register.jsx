import { CircularProgress } from "@material-ui/core";
import React, { useContext, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { LoginLogo } from '../../components/loginLogo/LoginLogo';
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios"
import "./register.css";
import { loginCall } from "../../apiCalls";

export const Register = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const passwordAgainRef = useRef();

    const history = useHistory();
    const { isFetching, dispatch } = useContext(AuthContext)

    const handleRegister = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordAgainRef.current.value) {
            passwordRef.current.setCustomValidity("Passwords don't match!");
        }
        else {
            const user = {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            try {
                const res = await axios.post("/auth/register", user);
                //login
                if (res.data) {
                    loginCall({
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                    }, dispatch)
                }
            } catch (error) {
                console.log(error);
            }
        }



    }

    useEffect(() => {

    }, [])

    return (
        <div className="register">
            <div className="registerWrapper">
                <LoginLogo />

                <div className="registerForm">
                    <form className="registerBox" onSubmit={handleRegister} >
                        <input
                            placeholder="Username"
                            required
                            className="registerInput"
                            ref={usernameRef}
                        />
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="registerInput"
                            ref={emailRef}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            minLength="3"
                            className="registerInput"
                            ref={passwordRef}
                        />
                        <input
                            placeholder="Password Again"
                            type="password"
                            required
                            minLength="3"
                            className="registerInput"
                            ref={passwordAgainRef}
                        />
                        <button className="registerButton" type="submit">
                            {isFetching
                                ? <CircularProgress color="white" size="30px" />
                                : "Sign Up"}
                        </button>
                        <button className="logIntoLoginButton" onClick={() => history.push("/login")} >
                            Log into Accoun
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
