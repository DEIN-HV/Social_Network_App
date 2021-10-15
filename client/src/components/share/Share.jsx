import React, { useContext, useRef, useState } from 'react';
import './share.css';
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";
import { AuthContext } from '../../context/authContext/AuthContext';
import axios from "axios";
import { ProfilePicture } from "../profilePicture/ProfilePicture"

export const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const descRef = useRef(null);

    const handleShare = async () => {
        const share = {
            userId: user._id,
            desc: descRef.current.value,
        }
        try {
            const post = await axios.post("/posts", share)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <ProfilePicture user={user} size="50px" />
                    <input
                        type="text"
                        className="shareInput"
                        placeholder={`What's in your mind, ${user.username}`}
                        ref={descRef}
                    />
                </div>

                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={handleShare}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareOptionIcon" />
                            <span className="shareOptionText">
                                Photo or Video
                            </span>
                            <input
                                style={{ display: 'none' }}
                                type="file" id="file"
                                accept=".png, .jpeg, .jpg"
                                onClick={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareOptionIcon" />
                            <span className="shareOptionText">
                                Tag
                            </span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareOptionIcon" />
                            <span className="shareOptionText">
                                Location
                            </span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareOptionIcon" />
                            <span className="shareOptionText">
                                Feeling
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="shareButton">
                        Share
                    </button>
                </form>

            </div>
        </div>
    )
}
