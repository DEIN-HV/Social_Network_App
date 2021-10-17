import React from 'react';
import './profileInfo.css';

import { CloseFriend } from '../closeFriend/CloseFriend';
import { LocationOn, Home, Work } from '@material-ui/icons';
import { FriendList } from "../friendList/FriendList"

export const ProfileInfo = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="profileInfo">
            <div className="profileInfoTop">
                <div className="userInfoTitle">User Information</div>

                <div className="userInfo">
                    <Home className="userInfoIcon" />
                    <span className="userInfoText">Lives in <b>{user.city}</b></span>
                </div>
                <div className="userInfo">
                    <LocationOn className="userInfoIcon" />
                    <span className="userInfoText">From <b>{user.from}</b></span>
                </div>

                <div className="userInfo">
                    <Work className="userInfoIcon" />
                    <span className="userInfoText">Work at <b>{user.workAt}</b></span>
                </div>
            </div>
            <FriendList user={user} />

        </div>
    )
}
