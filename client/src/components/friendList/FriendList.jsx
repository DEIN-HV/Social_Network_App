import "./friendList.css";
import { Users } from '../../dummyData';
import { useEffect, useState } from "react";
import axios from "axios"
import { ProfilePicture } from "../profilePicture/ProfilePicture";

export const FriendList = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const friendIdList = user.followings;
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        fetchFriendInfo();
    }, [user])

    const fetchFriendInfo = async () => {
        try {
            const friends = await Promise.all(
                friendIdList.map((friendId) => {
                    return axios.get("/users?userId=" + friendId);
                })
            )
            let friendArr = []
            friends.map(({ data }) => {
                const { _id, username, profilePicture } = data;
                friendArr.push({ _id, username, profilePicture })
            })
            setFriendList(friendArr);

        } catch (error) {
            console.log(error)
        }


    }
    // axios.get("/users?userId=" + id);
    if (!friendList) return "loading..."
    return (


        <div className="friendList">
            <div className="userInfoTitle">Close Friends</div>
            <div className="profileInfoCloseFriend">
                {friendList.map((friend) => (
                    <img src={friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"}
                        alt={friend.username}
                        className="profileInfoCloseFriendImg"
                    />
                ))}
            </div>
        </div>
    )
}
