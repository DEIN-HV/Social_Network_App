import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import "./friendRequest.css"

export const FriendRequest = ({ requestId, onHandleRequest }) => {
    const [requestUser, setRequestUser] = useState();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        getRequestUserInfo();
    }, [requestId]);

    const getRequestUserInfo = async () => {
        try {
            const res = await axios.get("/users?userId=" + requestId);
            setRequestUser(res.data);
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    if (!requestUser) return "";
    return (
        <div className="friendRequest">
            <div className="friendRequestLeft">
                <ProfilePicture profilePicture={requestUser.profilePicture} size="50px" />
            </div>

            <div className="friendRequestRight">
                <div className="friendRequestText">
                    <b>{requestUser.username}</b>
                </div>
                <div className="friendRequestButtons">
                    <button className="friendRequetButton accept" onClick={() => onHandleRequest(requestId, 1)}>
                        <p className="friendRequetBtnText">Accept</p>
                    </button>
                    <button className="friendRequetButton deny" onClick={() => onHandleRequest(requestId, 2)}>
                        <p className="friendRequetBtnText">Deny</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
