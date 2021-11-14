import axios from 'axios';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import "./comment.css";

export const Comment = ({ comment }) => {
    const [commentUser, setCommentUser] = useState(null);
    console.log(comment.userId)

    useEffect(() => {
        fetchCommentUserInfo();
    }, [comment.userId])

    const fetchCommentUserInfo = async () => {
        try {
            const res = await axios.get("/users?userId=" + comment.userId);
            setCommentUser(res.data);
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    };

    if (!commentUser) return ""

    return (
        <div className="comment">
            <div className="showComment">
                <div className="showCommentLeft">
                    <ProfilePicture profilePicture={commentUser.profilePicture} size="40px" />
                </div>
                <div className="showCommentRight">
                    <div className="commentContent">
                        <p className="commentUsername" >
                            {commentUser.username}
                        </p>
                        <p className="commentText">{comment.text}</p>
                    </div>

                    <p className="commentTime">{format(comment.createdAt)}</p>
                </div>
            </div>
        </div>
    )
}
