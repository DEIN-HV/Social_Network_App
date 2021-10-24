import React, { useContext, useRef, useState } from 'react';
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
    CloudUpload
} from "@material-ui/icons";
import { AuthContext } from '../../context/authContext/AuthContext';
import axios from "axios";
import { ProfilePicture } from "../profilePicture/ProfilePicture"
import { Modal } from '@material-ui/core';
import "./modalShare.css"

export const ModalShare = ({ open, onHandleClose }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const descRef = useRef(null);

    const handlePost = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: descRef.current.value,
        }
        console.log(newPost)
        console.log(file)

        if (file) {
            const newForm = new FormData();
            const fileName = Date.now() + file.name;
            newPost.img = "post/" + fileName;
            newForm.append("name", fileName);
            newForm.append("type", "post");
            newForm.append("file", file);
            console.log(newForm)
            try {
                //upload image
                await axios.post("/upload", newForm);
            } catch (error) {
                console.log(error);
            }
        }

        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const handleSetFile = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
    }

    return (
        <Modal open={open} onClose={onHandleClose}>
            <div className="modalShare modal">
                <div className="shareWrapper">
                    <div className="shareTop">
                        <ProfilePicture user={user} size="50px" />
                        <input
                            type="text"
                            className="shareInput"
                            placeholder={`What's on your mind, ${user.username}`}
                            ref={descRef} />
                    </div>

                    {/* <hr className="shareHr" /> */}

                    <div className="shareImgContanier">
                        {!file
                            ? <label htmlFor="file" className="addPhotoContainer">
                                <div className="addPhotoContainerText">
                                    <CloudUpload className="addPhotoContainerIcon" htmlColor="blue" />
                                    Choose your image
                                </div>
                            </label>
                            : <>
                                <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                                <Cancel className="cancelIcon" onClick={() => setFile(null)} />
                            </>
                        }
                    </div>
                    <form className="shareBottom" onSubmit={handlePost}>
                        <div className="shareOptions">
                            <label htmlFor="file" className="shareOption">
                                <PermMedia htmlColor="tomato" className="shareOptionIcon" />
                                <span className="shareOptionText">
                                    Photos
                                </span>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="file"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={handleSetFile} />
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
                            <div className="shareOption subIcon">
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
        </Modal>
    )
}
