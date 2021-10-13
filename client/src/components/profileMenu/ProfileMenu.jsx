
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Modal, Typography } from '@material-ui/core';
import { ArrowDropDown, Settings, ExitToApp } from '@material-ui/icons';
import { ListItemButton } from "@mui/material"
import "./profileMenu.css";
import { ProfilePicture } from '../profilePicture/ProfilePicture';
import { AuthContext } from '../../context/authContext/AuthContext';
import { Logout } from '../../context/authContext/AuthAction';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";

export const ProfileMenu = ({ user }) => {
    const { dispatch } = useContext(AuthContext)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="profileMenu">
            <ArrowDropDown className="icon" htmlColor="white" onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ul className="profileMenuList">
                    <li className="profileMenuListItem">
                        <Link to={`/profile/${user._id}`} className="profileLink">
                            <div className="profileMenuListItemWrapper">
                                <ProfilePicture user={user} size="50px" />
                                <span className="profileMenuListText">
                                    See your info
                                </span>
                            </div>
                        </Link>
                    </li>
                    <Divider className="hr" style={{ marginBottom: '10px' }} />
                    <li className="profileMenuListItem">
                        <div className="profileMenuListItemWrapper">
                            <span className="profileMenuListIcon">
                                <Settings />
                            </span>
                            <span className="profileMenuListText">
                                Setting
                            </span>
                        </div>
                    </li>

                    <li className="profileMenuListItem" onClick={() => dispatch(Logout())}>
                        <div className="profileMenuListItemWrapper">
                            <span className="profileMenuListIcon">
                                <ExitToApp />
                            </span>
                            <span className="profileMenuListText">
                                Logout
                            </span>
                        </div>
                    </li>
                </ul>
            </Modal>
        </div>
    );
}
