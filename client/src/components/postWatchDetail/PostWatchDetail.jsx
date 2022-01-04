import './postWatchDetail.css';
import { format } from 'timeago.js';
import { ProfilePicture } from "../profilePicture/ProfilePicture"

export const PostWatchDetail = ({ post, i, postUser }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    console.log(postUser)

    if (!postUser) return "";
    return (
        <div>
            <div className="postTop">
                <div className="postTopLeft">
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

                    <span className="postTime">{format(post.createdAt)}</span>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>

                {/* <img key={i} src={PF + post.img}
                    alt=""
                    className="postWatchImg" alt="" /> */}

                {post.img.includes("videos") ?
                    <video src={PF + post.img}
                        className="postWatchImg"
                        controls="controls" />
                    :
                    <img
                        src={PF + post.img}
                        alt=""
                        className="postWatchImg"
                    />
                }
            </div>
        </div>
    )
}
