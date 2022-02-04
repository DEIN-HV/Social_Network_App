import axios from "axios";
import { useEffect, useState } from "react";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import { format } from 'timeago.js';
import "./notification.css";
import { Link } from "react-router-dom";
import { Clear } from "@mui/icons-material"

export const Notification = ({ notification, option, index, onRemoveNotification }) => {
    const [postUser, setPostuser] = useState();
    const [isRead, setIsRead] = useState();

    useEffect(() => {
        getPostUserInfo();
        setIsRead(notification.isRead);
    }, [notification]);

    const getPostUserInfo = async () => {
        try {
            const res = await axios.get("/users?userId=" + notification.postUser);
            setPostuser(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleReadedNotification = async () => {
        console.log("readed")
        if (!notification.isRead) {
            try {
                await axios.put("/notifications/readed/" + notification._id);
                setIsRead(true);
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (!postUser) return "";
    return (

        <div className="notification">
            <div className="notificationLeft">
                <ProfilePicture profilePicture={postUser.profilePicture} size="40px" />
            </div>

            <div className="notificationCenter">
                <Link className="link" to={`/post/${notification.postId}`} onClick={() => handleReadedNotification()}>
                    <div className="notificationText">
                        <b>{postUser.username}</b> has a new post

                    </div>
                    <div className="notificationTime">
                        {format(notification.createdAt)}
                    </div>
                </Link>
            </div>
            <div className="notificationRight">
                {!isRead && <div className="notificationMark"></div>}
                <div className="notificationCancelIconContent" onClick={() => onRemoveNotification(notification._id)}>
                    <Clear htmlColor="red" className="notificationCancelIcon" />
                </div>
            </div>
        </div>
    )
}
