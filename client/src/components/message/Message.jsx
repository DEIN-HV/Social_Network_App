import "./message.css";
import { format } from "timeago.js";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ProfilePicture } from "../profilePicture/ProfilePicture";

export const Message = ({ message, own, receiverInfo }) => {
    const { user } = useContext(AuthContext)

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageLeft">
                <ProfilePicture user={own ? user : receiverInfo} size="40px" />
            </div>
            <div className={own ? "messageRight own" : "messageRight"}>
                <p className={own ? "messageText own" : "messageText"}>
                    {message.text}
                </p>
                <p className="messageBottom">{format(message.createdAt)}</p>
            </div>
        </div>
    )
}
