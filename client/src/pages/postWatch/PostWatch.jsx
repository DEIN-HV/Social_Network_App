import "./postWatch.css";
import { Modal } from "@material-ui/core";
import { Cancel, NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { PostWatchDetail } from "../../components/postWatchDetail/PostWatchDetail";
import axios from "axios";

export const PostWatch = ({ isOpenPostWatch, setIsOpenPostWatch, post, postUser }) => {
    const [userPosts, setUserPosts] = useState([]);
    const [page, setPage] = useState(0);

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

    const handleChangePage = (page) => {
        setPage(page)
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
                        if (i === page)
                            return (
                                <PostWatchDetail post={post} key={i} postUser={postUser} />
                            )
                    })
                }
                {(page !== 0) &&
                    <NavigateBefore
                        className="postWatchIcon previous"
                        onClick={() => setPage(page - 1)}
                    />}

                {(page !== (postSeries.length - 1)) &&
                    <NavigateNext
                        className="postWatchIcon next"
                        onClick={() => setPage(page + 1)}
                    />}

                <div className="bulletPagination">
                    {
                        postSeries.map((post, i) => (
                            <div class={"bulletItem " + (i === page ? "active" : "")} onClick={() => handleChangePage(i)}></div>
                        ))
                    }
                </div>


            </div>
        </Modal>
    )
}

