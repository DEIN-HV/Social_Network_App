import { DoNotDisturbOn, AddCircle } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Follow, UnFollow, RemoveFriend } from "../../context/authContext/AuthAction";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./followButton.css";

const FollowButton = ({ followTargetId }) => {
    const { user, dispatch } = useContext(AuthContext);
    const [isFollowed, setIsFollowed] = useState(user.followings.includes(followTargetId));
    const [isFriend, setIsFriend] = useState(user.friendIds.includes(followTargetId));

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

    const handelRemoveFriend = async () => {
        try {
            await axios.put(`/users/${followTargetId}/friendRemove`, { userId: user._id });
            dispatch(RemoveFriend(followTargetId));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setIsFollowed(user.followings.includes(followTargetId));
        setIsFriend(user.friendIds.includes(followTargetId))
    }, [user, followTargetId]);

    return (
        <>
            {isFriend ?
                <button className="followButton active" onClick={handelRemoveFriend}>
                    <DoNotDisturbOn className="followButtonIcon" />
                    <span className="followButtonText">Remove Friend</span>
                </button>


                : <button className={`followButton ${isFollowed ? "active" : ""}`} onClick={handleFollow}>
                    {isFollowed
                        ? <DoNotDisturbOn className="followButtonIcon" />
                        : <AddCircle className="followButtonIcon" />
                    }
                    <span className="followButtonText">{isFollowed ? "Cancel Request" : "Friend Request"}</span>
                </button>

            }
        </>
    )
}

export default FollowButton
