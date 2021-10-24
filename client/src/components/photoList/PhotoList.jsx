import "./photoList.css";

export const PhotoList = ({ posts }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="photoList">
            <div className="userInfoTitle">Photo List</div>
            <div className="profileInfoPhotoList">
                {posts.map((post) => (
                    <img src={PF + post.img}
                        alt={post.desc}
                        className="profileInfoPhotoListImg"
                    />
                ))}
            </div>
        </div>
    )
}
