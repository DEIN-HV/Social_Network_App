import React, { useContext, useEffect, useRef, useState } from 'react';
import { Posts, Users } from '../../dummyData';
import { Post } from '../post/Post';
import { Share } from '../share/Share';
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext"
import { Player } from 'video-react';
import { io } from "socket.io-client";
import './feed.css';

export const Feed = () => {
    const socket = useRef();
    const [timeline, setTimeline] = useState([]);
    const [arrivalPost, setArrivalPost] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchPost();

        socket.current = io("ws://localhost:8900");
        socket.current.on("getNewPost", (newPost) => {
            setTimeline((timeline) => [newPost, ...timeline]);
        });

    }, []);
    console.log(arrivalPost)


    const fetchPost = async () => {
        try {
            const res = await axios.get(`/posts/timeline/${user._id}`);
            setTimeline(res.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="feed">
            <Share />
            {timeline.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    )
}
