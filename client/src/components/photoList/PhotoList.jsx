import { useState } from "react";
import { PostWatch } from "../../pages/postWatch/PostWatch";
import "./photoList.css";

export const PhotoList = ({ post }) => {
    const [isOpenPostWatch, setIsOpenPostWatch] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            <img src={PF + post.img}
                alt={post.desc}
                className="profileInfoPhotoListImg"
                onClick={() => setIsOpenPostWatch(true)}
            />
            {/* POST WATCH */}
            <PostWatch
                isOpenPostWatch={isOpenPostWatch}
                setIsOpenPostWatch={setIsOpenPostWatch}
                post={post}
            />
        </>
    )
}
