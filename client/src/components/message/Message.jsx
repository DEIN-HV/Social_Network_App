import "./message.css";
import { format } from "timeago.js";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import { useParams } from "react-router-dom";

export const Message = ({ message, own, type, receiverInfo, groupConversationMemberInfos }) => {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    let otherMemberPicture
    if (type === 1 && receiverInfo)
        otherMemberPicture = receiverInfo

    if (type === 2 && groupConversationMemberInfos) {
        const groupMemberInfo = groupConversationMemberInfos.filter((u) => u._id === message.sender);
        if (groupMemberInfo.length > 0) otherMemberPicture = groupMemberInfo[0].profilePicture
    }

    return (
        <div className={own ? "message own" : "message"}>

            <div className="messageLeft">
                <ProfilePicture profilePicture={own ? user.profilePicture : otherMemberPicture} size="40px" />
            </div>
            <div className={own ? "messageRight own" : "messageRight"}>
                <div className={own ? "messageContent own" : "messageContent"}>
                    <p className={own ? "messageText own" : "messageText"}>
                        {message.text}
                    </p>
                    {message.img &&
                        <img className="messageImg" src={PF + message.img} alt="" />
                    }
                </div>
                <p className="messageBottom">{format(message.createdAt)}</p>
            </div>


        </div>
    )
}
