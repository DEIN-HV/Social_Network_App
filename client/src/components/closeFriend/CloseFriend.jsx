import React from 'react';
import './closeFriend.css';

export const CloseFriend = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (

        <li key={user.id} className="sideBarFriendListItem">
            <img src={PF + user.profilePicture}
                alt=""
                className="friendListAvt"
            />
            <span className="friendListName">{user.username}</span>
        </li>
    )
}
