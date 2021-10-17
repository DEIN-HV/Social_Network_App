import React, { useContext, useEffect, useState } from 'react';
import { MoreVert } from "@material-ui/icons";
import './post.css'
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from "react-router-dom";
import { ThumbUpOutlined, ThumbUpRounded, FavoriteRounded, FavoriteBorderOutlined } from "@material-ui/icons";
import { AuthContext } from '../../context/authContext/AuthContext';
// import { Users } from '../../dummyData';

export const Post = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [like, setLike] = useState(post.likes.length);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [postUser, setPostUser] = useState({});

    const { user } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(user._id));
    }, [post.likes])

    const handleLike = async () => {
        try {
            await axios.put(`/posts/${post._id}/like`, { userId: user._id });
        } catch (error) {
            console.log(error)
        }
        // setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${post.userId}`);
                setPostUser(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser();
        setLike(post.likes.includes(user._id) ? like - 1 : like)
    }, []);

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${postUser._id}`} className="profileLink">
                            <img
                                src={postUser.profilePicture
                                    ? PF + postUser.profilePicture
                                    : PF + "person/noAvatar.png"}
                                alt=""
                                className="postProfileImg"
                            />
                            <span className="postUsername">
                                {postUser.username}
                            </span>
                        </Link>
                        <span className="postTime">{format(post.createdAt)}</span>
                    </div>

                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    {post.img &&
                        <img
                            src={PF + post.img}
                            alt=""
                            className="postImg"
                        />}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {isLiked
                            // ? <ThumbUpRounded htmlColor="blue" className="likeIcon" onClick={handleLike} />
                            ? <img
                                src={`${PF}like.png`}
                                alt=""
                                className="likeIcon"
                                onClick={handleLike} />
                            : <ThumbUpOutlined style={{ color: "rgb(213 213 213)" }} className="likeIcon" onClick={handleLike} />}

                        {isLiked
                            ? <img
                                className="likeIcon"
                                src={`${PF}heart.png`}
                                onClick={handleLike}
                                alt=""
                            />
                            : <FavoriteBorderOutlined style={{ color: "rgb(213 213 213)" }} className="likeIcon" onClick={handleLike} />}
                        {(like > 0 || isLiked == true) &&
                            <span className="countLike">
                                {isLiked ? `You ${like ? "and " : ""}` : ""}
                                {like ? `${like} ${like == 1 ? "people" : "peoples"} ` : ""}
                                liked this
                            </span>}

                    </div>
                    <div className="postBottomRight">
                        <span className="comments">{post.comment} comments</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
