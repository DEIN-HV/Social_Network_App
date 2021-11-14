import React, { useContext, useEffect, useRef, useState } from 'react';
import { Chat, Notifications, Person, Search, ArrowDropDown } from '@material-ui/icons';
import './topbar.css'
import { Link, useHistory } from 'react-router-dom';
import { ProfileMenu } from '../profileMenu/ProfileMenu';
import { AuthContext } from '../../context/authContext/AuthContext'
import { ProfilePicture } from '../profilePicture/ProfilePicture';

export const Topbar = ({ searchValue, limit }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [value, setValue] = useState(searchValue)

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            history.push(`/search?username=${value}&_page=1&_limit=5`);
        }
    }

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
                        name="searchInput"
                        placeholder="Search for friend, post or video"
                        // ref={searchRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    {/* <input type="text" name="test" value={value} /> */}
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
                        <ProfilePicture profilePicture={user.profilePicture} size="40px" />
                    </Link>
                    <ProfileMenu user={user} />
                </div>
            </div>
        </div>
    )
}
