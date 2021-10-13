import React from 'react';
import './profileInfo.css';
import { Users } from '../../dummyData';
import { CloseFriend } from '../closeFriend/CloseFriend';
import { LocationOn, Home, Work } from '@material-ui/icons';

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

            <div className="profileInfoBottom">
                <div className="userInfoTitle">Close Friends</div>
                <div className="profileInfoCloseFriend">
                    {Users.map((user) => (
                        <img src={PF + user.profilePicture}
                            alt={user.username}
                            className="profileInfoCloseFriendImg"
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}
