import axios from "axios";
import { useEffect, useState } from "react";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import { CircularProgress } from "@material-ui/core"
import { format } from "timeago.js"
import "./notification.css";
import { Link } from "react-router-dom";

export const Notification = ({ notification, index }) => {
    const [postUser, setPostuser] = useState();

    useEffect(() => {
        getPostUserInfo();
    }, [notification])

    const getPostUserInfo = async () => {
        try {
            const res = await axios.get("/users?userId=" + notification.postUser);
            setPostuser(res.data);
        } catch (error) {
            console.log(error)
        }
    }



    if (!postUser) return "";
    return (
        <Link className="link" to={`/post/${notification.postId}`} onClick={() => console.log("readed")}>
            <div className="notification">
                <ProfilePicture profilePicture={postUser.profilePicture} size="40px" />
                <div className="notificationContent">
                    <div className="notificationText">
                        <b>{postUser.username}</b> has a new post

                    </div>
                    <div className="notificationTime">
                        {format(postUser.createAt)}
                    </div>
                </div>
                {!postUser.isRead &&
                    <div className="notificationMark"></div>
                }
            </div>
        </Link>
    )
}
