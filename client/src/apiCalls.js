import { LoginFailure, LoginStart, LoginSucess } from "./context/authContext/AuthAction";
import axios from "axios";

export const loginCall = async (useCredential, dispatch) => {
    dispatch(LoginStart(useCredential));
    try {
        setTimeout(async () => {
            const res = await axios.post("/auth/login", useCredential);
            dispatch(LoginSucess(res.data));
        }, 1000);
    } catch (error) {
        dispatch(LoginFailure(error));
    }
}
