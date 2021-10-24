import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { io } from "socket.io-client";
import "./friendList.css";

export const FriendList = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const friendIdList = user.followings;
    const [friendList, setFriendList] = useState([]);
    const [onlineUser, setOnlineUser] = useState([]);

    const socket = useRef();

    // //GET NEW MESSAGE FROM WEB SOCKET
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, []);

    useEffect(() => {
        //SET ONLINE USER TO WEB SOCKET
        socket.current.emit("addUser", user._id);

        //GET ONLINE USER FROM WEB SOCKET
        socket.current.on("getUsers", (users) => {
            setOnlineUser(users);
        })
    }, [user]);

    useEffect(() => {
        fetchFriendInfo();
    }, [user, onlineUser])

    const fetchFriendInfo = async () => {
        try {
            const friends = await Promise.all(
                friendIdList.map((friendId) => {
                    return axios.get("/users?userId=" + friendId);
                })
            )
            let friendArr = []
            friends.map(({ data }) => {
                const { _id } = data;
                const isOnline = onlineUser.some((user) => user.userId === _id);
                friendArr.push({ ...data, isOnline })
            })
            setFriendList(friendArr);

        } catch (error) {
            console.log(error)
        }
    }

    console.log(friendList)
    return (

        <ul className="friendList">
            {friendList.map((friend) => (
                <Link key={friend._id} to={{ pathname: `/messenger/${friend._id}`, receiver: friend }} className="link">
                    <li key={friend._id} className="friendListItem">
                        <img src={friend.profilePicture
                            ? PF + friend.profilePicture
                            : PF + "person/noAvatar.png"}
                            alt=""
                            className="friendListAvt"
                        />
                        {friend.isOnline &&
                            <span className="rightbarOnline"></span>
                        }
                        <span className="friendListName">{friend.username}</span>
                    </li>
                </Link>

            ))}
        </ul>
    )
}
