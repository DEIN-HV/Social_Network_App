import "./postWatch.css";
import { Modal } from "@material-ui/core";
import { Cancel, NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { PostWatchDetail } from "../../components/postWatchDetail/PostWatchDetail";
import axios from "axios";

export const PostWatch = ({ isOpenPostWatch, setIsOpenPostWatch, post, postUser }) => {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        fecthUserPost();
    }, [post])

    //FETCH USER POST
    const fecthUserPost = async () => {
        try {
            const res = await axios.get(`/posts/imgBlog/${post.userId}`);
            setUserPosts(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const [photoNumber, setPhotoNumber] = useState(0)
    const arr = userPosts.filter((p) => p._id !== post._id);
    const postSeries = [post].concat(arr);

    return (
        <Modal open={isOpenPostWatch} onClose={() => setIsOpenPostWatch(false)}>
            <div className="postWatch">
                <Cancel className="postWatchIcon" onClick={() => setIsOpenPostWatch(false)} />
                {
                    postSeries.map((post, i) => {
                        if (i === photoNumber)
                            return (
                                <PostWatchDetail post={post} key={i} postUser={postUser} />
                            )
                    })
                }
                {(photoNumber !== 0) &&
                    <NavigateBefore
                        className="postWatchIcon previous"
                        onClick={() => setPhotoNumber(photoNumber - 1)}
                    />}

                {(photoNumber !== (postSeries.length - 1)) &&
                    <NavigateNext
                        className="postWatchIcon next"
                        onClick={() => setPhotoNumber(photoNumber + 1)}
                    />}
            </div>
        </Modal>
    )
}

