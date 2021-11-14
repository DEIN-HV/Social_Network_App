import {
    PhotoLibrary, EmojiEmotions, Room, VideoCall
} from "@material-ui/icons";
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { ModalShare } from '../modalShare/ModalShare';
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import { Link } from "react-router-dom";
import './share.css';

export const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);

    //open modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link to={`/profile/${user._id}`} className="link">
                        <ProfilePicture profilePicture={user.profilePicture} size="50px" />
                    </Link>
                    <input
                        type="text"
                        className="shareInput"
                        placeholder={`What's on your mind, ${user.username}`}
                        onClick={handleOpen} />
                </div>

                <hr className="shareHr" />
                <div className="shareBottom">
                    <label htmlFor="file" className="shareOption">
                        <VideoCall htmlColor="tomato" className="shareOptionIcon" />
                        <span className="shareOptionText">
                            Live video
                        </span>
                        {/* <input
                                style={{ display: 'none' }}
                                type="file"
                                id="file"
                                accept=".png, .jpeg, .jpg"
                                onChange={handleSetFile} /> */}
                    </label>
                    <div className="shareOption">
                        <PhotoLibrary htmlColor="blue" className="shareOptionIcon" />
                        <span className="shareOptionText">
                            Photo/Video
                        </span>
                    </div>
                    <div className="shareOption subIcon">
                        <EmojiEmotions htmlColor="green" className="shareOptionIcon" />
                        <span className="shareOptionText">
                            Felling/Activity
                        </span>
                    </div>
                </div>
            </div>

            <ModalShare open={open} onHandleClose={handleClose} />
        </div>
    )
}
