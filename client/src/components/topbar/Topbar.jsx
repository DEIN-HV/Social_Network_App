import React, { useContext, useEffect, useRef, useState } from 'react';
import { Chat, Notifications, Person, Search, ArrowDropDown } from '@material-ui/icons';
import './topbar.css'
import { Link, useHistory } from 'react-router-dom';
import { ProfileMenu } from '../profileMenu/ProfileMenu';
import { AuthContext } from '../../context/authContext/AuthContext'
import { ProfilePicture } from '../profilePicture/ProfilePicture';
import axios from "axios"
import { io } from "socket.io-client";
import { Notification } from '../notification/Notification';

export const Topbar = ({ searchValue, limit }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [value, setValue] = useState(searchValue);
    const [notications, setNotifications] = useState();
    const [openNotification, setOpenNotification] = useState(false);
    const notificationRef = useRef();
    const socket = useRef();

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            history.push(`/search?username=${value}&_page=1&_limit=5`);
        }
    }

    useEffect(() => {
        getNotification();

        socket.current = io("ws://localhost:8900");
        socket.current.on("getNotification", (newNotification) => {
            setNotifications((notications) => [...notications, newNotification])
        });
    }, []);

    const getNotification = async () => {
        try {
            const res = await axios.get("/notifications/" + user._id);
            setNotifications(res.data);
        } catch (error) {
            console.log(error)
        }
    };

    //CLOSE NOTIFICATION WHEN CLICK OUTSIDE
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (openNotification && notificationRef.current && !notificationRef.current.contains(e.target)) {
                setOpenNotification(false)
            }
        }
        //bind the listener event
        document.addEventListener("mousedown", checkIfClickedOutside);

    }, [openNotification]);

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
                    <div className="topbarIconItem" onClick={() => setOpenNotification(!openNotification)}>
                        <Notifications />
                        <span className="topbarIconBadge">{notications ? notications.length : ""}</span>
                    </div>
                </div>
                <div className="proFile">
                    <Link to={`/profile/${user._id}`} className="topbarProfileImg link">
                        <ProfilePicture profilePicture={user.profilePicture} size="40px" />
                    </Link>
                    <ProfileMenu user={user} />
                </div>

                {
                    (notications && openNotification) &&
                    <div className="notifications" id="noti" ref={notificationRef}>
                        {notications.map((notification, i) => (
                            <Notification
                                notification={notification}
                                index={i}
                            />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
