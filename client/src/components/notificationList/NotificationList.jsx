import { Notifications } from '@material-ui/icons';
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { AuthContext } from '../../context/authContext/AuthContext';
import { Notification } from '../notification/Notification';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './notificationList.css';

export const NotificationList = () => {
    const { user } = useContext(AuthContext);
    const [openNotification, setOpenNotification] = useState(false);
    const [notications, setNotifications] = useState();
    const [option, setOption] = useState('all');
    const notificationRef = useRef();
    const socket = useRef();

    const handleChange = (event, newOption) => {
        setOption(newOption);
    };

    useEffect(() => {
        getNotification();

        socket.current = io("ws://localhost:8900");
        socket.current.on("getNewPost", (newPost) => {
            setNotifications((notications) => [...notications, newPost])
        });
    }, [option]);

    const getNotification = async () => {
        try {
            const res = await axios.get("/notifications?userId=" + user._id + "&option=" + option);
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


    const handleRemoveNotification = async (notificationId) => {
        if (notificationId) {

            try {
                await axios.delete("/notifications/" + notificationId);
            } catch (error) {
                console.log(error)
            }

            // setNotifications((n) => )
            const newNotification = notications.filter(n => n._id !== notificationId)
            setNotifications(newNotification)
        }
    }

    return (
        <>
            <div className="topbarIconItem" onClick={() => setOpenNotification(!openNotification)}>
                <Notifications />
                <span className="topbarIconBadge">{notications ? notications.length : ""}</span>
            </div>

            {
                (notications && openNotification) &&
                <div className="notifications" id="noti" ref={notificationRef}>
                    <div className="notificationHeader">
                        <div className="notificationTitle">
                            Notifcations
                        </div>
                        <div className="notificationOptions">
                            <ToggleButtonGroup
                                color="primary"
                                value={option}
                                exclusive
                                onChange={handleChange}
                                size="small"
                            >
                                <ToggleButton value="all">All</ToggleButton>
                                <ToggleButton value="unread">Unread</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    {notications.map((notification, i) => (
                        <Notification
                            notification={notification}
                            option={option}
                            index={i}
                            onRemoveNotification={handleRemoveNotification}
                        />
                    ))}
                </div>
            }
        </>
    )
}
