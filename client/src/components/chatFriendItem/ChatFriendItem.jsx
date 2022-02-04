import "./chatFriendItem.css";
import { Link } from "react-router-dom";

export const ChatFriendItem = ({ friend }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <Link key={friend._id}
            to={{
                pathname: `/messenger/${friend._id}`,
                receiver: friend,
                type: 1
            }}
            className="link">
            <li key={friend._id} className="friendListItem">
                <div className="profilePictureContainer">
                    <img src={friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"}
                        alt=""
                        className="friendListAvt"
                    />
                    {friend.isOnline &&
                        <span className="rightbarOnline"></span>
                    }
                </div>
                <span className="friendListName">{friend.username}</span>
            </li>
        </Link>
    )
}
