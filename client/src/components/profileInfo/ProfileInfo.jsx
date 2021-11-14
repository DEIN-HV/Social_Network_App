import React from 'react';
import './profileInfo.css';

import { CloseFriend } from '../closeFriend/CloseFriend';
import { LocationOn, Home, Work } from '@material-ui/icons';
import { PhotoList } from '../photoList/PhotoList';
import { ProfilePicture } from '../profilePicture/ProfilePicture';
import { Link } from 'react-router-dom';

export const ProfileInfo = ({ user, hasPicture }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    if (!user) return ""
    return (
        <div className="profileInfo">
            <div className="profileInfoTop">

                {hasPicture &&
                    <Link className="link" to={`/profile/${user._id}`}>
                        <div className="profileInfoProfilePicture">
                            <ProfilePicture profilePicture={user.profilePicture} size="100px" />
                            <div style={{ marginTop: 10 }} className="userInfoTitle">{user.username}</div>
                        </div>
                    </Link>
                }

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
        </div>
    )
}
