import axios from "axios";
import { useEffect, useState } from "react";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import { format } from 'timeago.js';
import "./notification.css";
import { Link } from "react-router-dom";

export const Notification = ({ notification, index }) => {
    const [postUser, setPostuser] = useState();
    const [isRead, setIsRead] = useState();
    console.log(isRead)
    console.log(notification.isRead)

    useEffect(() => {
        setIsRead(notification.isRead);
    }, []);

    useEffect(() => {
        getPostUserInfo();
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
        <Link className="link" to={`/post/${notification.postId}`} onClick={() => handleReadedNotification()}>
            <div className="notification">
                <div className="notificationLeft">
                    <ProfilePicture profilePicture={postUser.profilePicture} size="40px" />
                </div>
                <div className="notificationCenter">
                    <div className="notificationText">
                        <b>{postUser.username}</b> has a new post

                    </div>
                    <div className="notificationTime">
                        {format(notification.createdAt)}
                    </div>
                </div>
                <div className="notificationRight">
                    {!isRead && <div className="notificationMark"></div>}
                </div>
            </div>
        </Link>
    )
}
