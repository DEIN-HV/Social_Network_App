import React, { useEffect, useState } from 'react';
import { Post } from '../post/Post';
import { Share } from '../share/Share';
import { ProfileInfo } from '../profileInfo/ProfileInfo';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './profileWall.css';
import { WallCenter } from '../wallCenter/WallCenter';
import { Divider } from "@material-ui/core"
import { PhotoList } from '../photoList/PhotoList';

export const ProfileWall = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        fecthUserPost();
        fecthUser();
    }, [id])

    //FETCH USER POST
    const fecthUserPost = async () => {
        try {
            const res = await axios.get(`/posts/profilePost/${id}`);
            setPosts(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    //FETCH USER INFO
    const fecthUser = async () => {
        try {
            const res = await axios.get(`/users?userId=${id}`);
            setUser(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="wall">
            <div className="wallWrapper">
                <div className="wallTop">
                    <img
                        src={user.coverPicture
                            ? PF + user.coverPicture
                            : PF + "person/noCover.jpeg"}
                        alt=""
                        className="coverImg"
                    />
                    <div className="wallTopInfo">
                        <img
                            src={user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                            }
                            alt=""
                            className="profileImg"
                        />
                        <span className="profileName">
                            {user.username}
                        </span>
                        <span className="profileSlogan">
                            {user.desc}
                        </span>
                    </div>
                </div>
                <Divider />
                <WallCenter wallUser={user} />
                <div className="wallBottom">
                    <div className="wallBottomWrapper">
                        <div className="wallBottomLeft">
                            <>
                                <ProfileInfo user={user} />

                                {/* PHOTO LIST PROFILE */}
                                {(posts.length > 0) &&
                                    <div className="photoList">
                                        <div className="userInfoTitle">Photo List</div>
                                        <div className="profileInfoPhotoList">
                                            {posts.map((post) => (
                                                <PhotoList post={post} />
                                            ))}
                                        </div>
                                    </div>
                                }
                            </>
                        </div>
                        <div className="wallBottomRight">
                            <Share />
                            {posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
