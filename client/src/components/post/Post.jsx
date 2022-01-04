import React, { useContext, useEffect, useRef, useState } from 'react';
import { AttachFile, EmojiEmotions, MoreVert, PermMedia } from "@material-ui/icons";
import './post.css'
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from "react-router-dom";
import { ThumbUpOutlined, ThumbUpRounded, FavoriteRounded, FavoriteBorderOutlined } from "@material-ui/icons";
import { AuthContext } from '../../context/authContext/AuthContext';
import { Comment } from '../comment/Comment';
import { PostWatch } from '../../pages/postWatch/PostWatch';
import Picker from 'emoji-picker-react';

export const Post = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [like, setLike] = useState(post.likes.length);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [postUser, setPostUser] = useState({});
    const [isOpenComment, setIsOpenComment] = useState(true);
    const [isOpenAllComment, setIsOpenAllComment] = useState(false);
    const [isOpenPostWatch, setIsOpenPostWatch] = useState(false);
    const [comments, setComments] = useState([]);
    const [openEmoji, setOpenEmoji] = useState(false);
    const emojiRef = useRef();
    const commentRef = useRef();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(user._id));
    }, [post.likes]);

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
        fetchComments();
        setLike(post.likes.includes(user._id) ? like - 1 : like)
    }, []);
    console.log(postUser)

    //CLOSE EMOJI WHEN CLICK OUTSIDE
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (openEmoji && emojiRef.current && !emojiRef.current.contains(e.target)) {
                setOpenEmoji(false)
            }
        }
        //bind the listener event
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [openEmoji])

    const fetchComments = async () => {
        try {
            const res = await axios.get("/comments/", {
                params: {
                    postId: post._id
                }
            });
            setComments(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLike = async () => {
        try {
            await axios.put(`/posts/${post._id}/like`, { userId: user._id });
        } catch (error) {
            console.log(error)
        }
        // setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    const handleComment = async (e) => {
        e.preventDefault();
        const newComment = {
            postId: post._id,
            userId: user._id,
            text: commentRef.current.value,
        }
        try {
            const res = await axios.post("/comments/", newComment);
            setComments([...comments, res.data]);
            commentRef.current.value = "";
        } catch (error) {
            console.log(error)
        }
    }

    const handleChoseEmoji = (e, emojiObject) => {
        commentRef.current.value += emojiObject.emoji;
    }

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
                    {post.img.includes("videos") ?

                        <video src={PF + post.img}
                            className="postImg"
                            controls="controls" />
                        :
                        <img
                            src={PF + post.img}
                            alt=""
                            className="postImg"
                            onClick={() => setIsOpenPostWatch(!isOpenPostWatch)}
                        />
                    }

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
                        <span className="comments"
                            onClick={() => setIsOpenComment(!isOpenComment)}>
                            {comments.length > 0 && `${comments.length} comments`}
                        </span>
                    </div>
                </div>

                {isOpenComment &&
                    <div className="comments">
                        <span className="linkShowAllComment" onClick={() => setIsOpenAllComment(!isOpenAllComment)}>
                            {comments.length > 1 &&
                                (isOpenAllComment ? "Less comment" : "All comments")}

                        </span>
                        <div className="commentsBox">
                            {comments.map((comment, i) => {
                                if (!isOpenAllComment) {
                                    if (i == (comments.length - 1))
                                        return <Comment comment={comment} key={i} />
                                }
                                else
                                    return <Comment comment={comment} key={i} />

                            })}
                        </div>
                        <form className="commentInputContainer" onSubmit={handleComment}>
                            <PermMedia htmlColor="tomato" className="commentInputIcon" />
                            <AttachFile htmlColor="blue" className="commentInputIcon" />
                            <EmojiEmotions htmlColor="goldenrod" className="commentInputIcon" onClick={() => setOpenEmoji(!openEmoji)} />
                            {openEmoji &&
                                <div className="emojiPicker" ref={emojiRef} >
                                    <Picker onEmojiClick={handleChoseEmoji} />
                                </div>
                            }
                            <input
                                className="commentInput"
                                placeholder="write something..."
                                ref={commentRef}
                            ></input>

                            <button className="commentSubmitButton" type="submit">
                                Send
                            </button>
                        </form>
                    </div>
                }
            </div>

            {/* POST WATCH */}
            <PostWatch
                isOpenPostWatch={isOpenPostWatch}
                setIsOpenPostWatch={setIsOpenPostWatch}
                post={post}
                postUser={postUser}
            />
        </div>
    )
}
