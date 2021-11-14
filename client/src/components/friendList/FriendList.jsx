import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { io } from "socket.io-client";
import "./friendList.css";
import { ChatFriendItem } from "../chatFriendItem/ChatFriendItem";
import { AddMemberItem } from "../addMemberItem/AddMemberItem";

export const FriendList = ({ friendListType, onCheckFriend }) => {

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

    return (
        <ul className="friendList">
            {friendList.map((friend) => {
                return (friendListType === 1)
                    ? (<ChatFriendItem friend={friend} />)
                    : (<AddMemberItem friend={friend} onCheckFriend={onCheckFriend} />)
            }
            )}
        </ul>
    )
}
