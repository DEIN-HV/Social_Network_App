import React, { useContext, useEffect, useState } from 'react';
import { Posts, Users } from '../../dummyData';
import { Post } from '../post/Post';
import { Share } from '../share/Share';
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext"
import './feed.css';

export const Feed = () => {
    const [posts, setPosts] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`posts/timeline/${user._id}`);
                setPosts(res.data.sort((a, b) => {
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
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}
