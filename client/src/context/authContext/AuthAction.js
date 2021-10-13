export const LoginStart = (userCredencial) => ({
    type: "LOGIN_START",
});

export const LoginSucess = (user) => (
    {
        type: "LOGIN_SUCCESS",
        payload: user,
    }
);

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});

export const Logout = () => ({
    type: "LOGOUT",
});

