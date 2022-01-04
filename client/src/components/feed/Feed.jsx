import React, { useContext, useEffect, useState } from 'react';
import { Posts, Users } from '../../dummyData';
import { Post } from '../post/Post';
import { Share } from '../share/Share';
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext"
import { Player } from 'video-react';
import './feed.css';

export const Feed = () => {
    const [timeline, setTimeline] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
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
        fetchPost();
    }, [])

    return (
        <div className="feed">
            <Share />
            {timeline.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    )
}
