import React, { useContext } from 'react';
import { Chat, Notifications, Person, Search, ArrowDropDown } from '@material-ui/icons';
import './topbar.css'
import { Link } from 'react-router-dom';
import { ProfileMenu } from '../profileMenu/ProfileMenu';
import { AuthContext } from '../../context/authContext/AuthContext'
import { ProfilePicture } from '../profilePicture/ProfilePicture';

export const Topbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="link">
                    <div className="logo">
                        <img src={`${PF}/logo.png`}
                            className="logoImg" />
                        <span className="logoText">Travel Blog</span>
                    </div>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Search for friend, post or video"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcon">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <Link className="iconLink" to="/messenger">
                        <div className="topbarIconItem">
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </div>
                    </Link>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">3</span>
                    </div>
                </div>

                <div className="proFile">
                    <Link to={`/profile/${user._id}`} className="topbarProfileImg link">
                        <ProfilePicture user={user} size="40px" />
                    </Link>
                    <ProfileMenu user={user} />
                </div>
            </div>
        </div>
    )
}
