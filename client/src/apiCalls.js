import { LoginFailure, LoginStart, LoginSucess } from "./context/authContext/AuthAction";
import axios from "axios";

export const loginCall = async (useCredential, dispatch) => {
    dispatch(LoginStart(useCredential));
    try {

        const res = await axios.post("/auth/login", useCredential);
        dispatch(LoginSucess(res.data));

    } catch (error) {
        dispatch(LoginFailure(error));
    }
}
