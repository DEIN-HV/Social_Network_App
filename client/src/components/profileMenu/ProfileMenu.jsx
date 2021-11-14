
import { Divider, Modal } from '@material-ui/core';
import { ArrowDropDown, ExitToApp, Settings } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { Logout } from '../../context/authContext/AuthAction';
import { AuthContext } from '../../context/authContext/AuthContext';
import { ProfilePicture } from '../profilePicture/ProfilePicture';
import "./profileMenu.css";

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
                                <ProfilePicture profilePicture={user.profilePicture} size="50px" />
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
