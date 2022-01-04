import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Rightbar } from '../../components/rightbar/Rightbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Topbar } from '../../components/topbar/Topbar';
import { Post } from "../../components/post/Post"
import './postDetail.css';

export const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    console.log(id)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/posts/${id}`);
                setPost(res.data);
                console.log(res.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchPost();
    }, [id])

    if (!post) return ""
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Post key={post._id} post={post} />
                <Rightbar />
            </div>
        </>
    )
}
