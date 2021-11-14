import { LoginFailure, LoginStart, LoginSucess, UpdateStart, UpdateSuccess, UpdatFailure } from "./context/authContext/AuthAction";
import axios from "axios";

//LOGIN
export const loginCall = async (useCredential, dispatch) => {
    dispatch(LoginStart());
    try {
        const res = await axios.post("/auth/login", useCredential);
        dispatch(LoginSucess(res.data));

    } catch (error) {
        console.log(error.response.data)
        dispatch(LoginFailure(error.response.data));
    }
}

//UPDATE USER INFO 
export const updateCall = async (userId, updateInfo, dispatch) => {
    dispatch(UpdateStart());
    try {
        const res = await axios.put("/users/" + userId, updateInfo);
        console.log(res.data)
        dispatch(UpdateSuccess(res.data));

    } catch (error) {
        dispatch(UpdatFailure(error));
    }
}
