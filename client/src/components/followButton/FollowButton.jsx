import { DoNotDisturbOn, AddCircle } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Follow, UnFollow } from "../../context/authContext/AuthAction";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./followButton.css";

const FollowButton = ({ followTargetId }) => {
    const { user, dispatch } = useContext(AuthContext);
    const [isFollowed, setIsFollowed] = useState(user.followings.includes(followTargetId));

    const handleFollow = async (e) => {
        e.preventDefault();
        try {
            if (isFollowed) {
                await axios.put(`/users/${followTargetId}/unfollow`, { userId: user._id });
                dispatch(UnFollow(followTargetId));
            }
            else {
                await axios.put(`/users/${followTargetId}/follow`, { userId: user._id });
                dispatch(Follow(followTargetId));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setIsFollowed(user.followings.includes(followTargetId));
    }, [user, followTargetId]);

    return (
        <button className={`followButton ${isFollowed ? "active" : ""}`} onClick={handleFollow}>
            {isFollowed
                ? <DoNotDisturbOn className="followButtonIcon" />
                : <AddCircle className="followButtonIcon" />
            }
            <span className="followButtonText">{isFollowed ? "Unfollow" : "Follow"}</span>
        </button>
    )
}

export default FollowButton
