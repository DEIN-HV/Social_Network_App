import { useEffect, useState } from "react";
import { PostWatch } from "../../pages/postWatch/PostWatch";
import "./photoList.css";

export const PhotoList = ({ post, index }) => {
    const [isOpenPostWatch, setIsOpenPostWatch] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [CNT, setCNT] = useState(0)

    useEffect(() => {
        setCNT(CNT + 1)
    }, [post])

    console.log(CNT)

    if (post.img == "" || CNT > 5) return "";
    return (
        <>
            {/* <img src={PF + post.img}
                alt={post.desc}
                className="profileInfoPhotoListImg"
                onClick={() => setIsOpenPostWatch(true)}
            /> */}

            {post.img.includes("videos") ?

                <video src={PF + post.img}
                    className="profileInfoPhotoListImg"
                    controls="controls" />
                :
                <img
                    src={PF + post.img}
                    alt=""
                    className="profileInfoPhotoListImg"
                    onClick={() => setIsOpenPostWatch(true)}
                />
            }
            {/* POST WATCH */}
            <PostWatch
                isOpenPostWatch={isOpenPostWatch}
                setIsOpenPostWatch={setIsOpenPostWatch}
                post={post}
            />
        </>
    )
}
