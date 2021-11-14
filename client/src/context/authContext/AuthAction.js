export const LoginStart = () => ({
    type: "LOGIN_START",
});

export const LoginSucess = (user) => (
    {
        type: "LOGIN_SUCCESS",
        payload: user,
    }
);

export const LoginFailure = (errorMessage) => ({
    type: "LOGIN_FAILURE",
    payload: errorMessage,
});

export const Logout = () => ({
    type: "LOGOUT",
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const UnFollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export const UpdateStart = () => ({
    type: "UPDATE_START",
});

export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
});

export const UpdatFailure = (error) => ({
    type: "UPDATE_FAILURE",
    payload: error,
});

