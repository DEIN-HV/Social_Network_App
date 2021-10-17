import "./wallCenter.css";
import { Chat, AddBox, MoreHoriz, ArrowDropDown, Edit } from "@material-ui/icons"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useParams } from "react-router";
import axios from "axios";
import { Follow, UnFollow } from "../../context/authContext/AuthAction";

export const WallCenter = () => {
    const { id } = useParams();
    const { user, dispatch } = useContext(AuthContext);
    const [isFollowed, setIsFollowed] = useState(user.followings.includes(id));
    const [isMine, setIsMine] = useState(false)

    const handleFollow = async (e) => {
        e.preventDefault();
        try {
            if (isFollowed) {
                await axios.put(`/users/${id}/unfollow`, { userId: user._id });
                dispatch(UnFollow(id));
            }
            else {
                await axios.put(`/users/${id}/follow`, { userId: user._id });
                dispatch(Follow(id));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setIsFollowed(user.followings.includes(id));
        setIsMine(user._id === id);
    }, [user, id])

    return (
        <div className="wallCenter">
            <div className="wallCenterLinks">
                <span className="wallCenterLink">Posts</span>
                <span className="wallCenterLink">About</span>
                <span className="wallCenterLink">Friends</span>
                <span className="wallCenterLink">Photos</span>
                <span className="wallCenterLink">Videos</span>
                <span className="wallCenterLink">More<ArrowDropDown /></span>
            </div>

            {isMine
                ? <div className="wallCenterButtons">
                    <button className="wallCenterButton" onClick={handleFollow}>
                        <AddBox className="wallCenterButtonIcon" />
                        <span className="wallCenterButtonText">Add Story</span>
                    </button>

                    <button className="wallCenterButton">
                        <Edit className="wallCenterButtonIcon" />
                        <span className="wallCenterButtonText">Edit Profile</span>
                    </button>

                    <button className="wallCenterButton">
                        <MoreHoriz className="wallCenterButtonIcon" />
                    </button>
                </div>

                : <div className="wallCenterButtons">
                    <button className={`wallCenterButton ${isFollowed ? "active" : ""}`} onClick={handleFollow}>
                        <AddBox className="wallCenterButtonIcon" />
                        <span className="wallCenterButtonText">{isFollowed ? "Unfollow" : "Follow"}</span>
                    </button>

                    <button className="wallCenterButton">
                        <Chat className="wallCenterButtonIcon" />
                        <span className="wallCenterButtonText">Message</span>
                    </button>

                    <button className="wallCenterButton">
                        <MoreHoriz className="wallCenterButtonIcon" />
                    </button>
                </div>
            }


        </div>
    )
}
