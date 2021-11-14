import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Cancel,
    Edit,
    Home,
    LocationOn,
    Work,
    Refresh,
    AccountCircle
} from "@material-ui/icons";
import { AuthContext } from '../../context/authContext/AuthContext';
import axios from "axios";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import { Divider, Modal } from '@material-ui/core';
import "./modalEditProfile.css";
import { updateCall } from '../../apiCalls';

export const ModalEditProfile = ({ wallUser }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [open, setOpen] = useState(false);
    const { user, dispatch } = useContext(AuthContext);
    const [profileImgfile, setProfileImgFile] = useState(null);
    const [coverImgfile, setCoverImgFile] = useState(null);
    const [nameField, setNameField] = useState(wallUser.username);
    const [cityField, setCityField] = useState(wallUser.city);
    const [fromField, setFromField] = useState(wallUser.from);
    const [workAtField, setWorkAtField] = useState(wallUser.workAt);

    useEffect(() => {
        initFieldValue();
    }, [wallUser])

    const initFieldValue = () => {
        setNameField(wallUser.username);
        setCityField(wallUser.city);
        setFromField(wallUser.from);
        setWorkAtField(wallUser.workAt);
    }


    // const descRef = useRef(null);
    const updateInfo = {
        userId: user._id,
    }

    const handleSave = async (e) => {
        e.preventDefault();

        //SET IMAGE
        if (profileImgfile) handleUploadImg(profileImgfile, "person");
        if (coverImgfile) handleUploadImg(coverImgfile, "cover");

        //SET INFO
        updateInfo.username = nameField;
        updateInfo.city = cityField;
        updateInfo.from = fromField;
        updateInfo.workAt = workAtField;
        try {
            updateCall(user._id, updateInfo, dispatch)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUploadImg = async (file, type) => {
        const newForm = new FormData();
        const fileName = Date.now() + file.name;
        if (type === "person") updateInfo.profilePicture = type + "/" + fileName;
        if (type === "cover") updateInfo.coverPicture = type + "/" + fileName;
        newForm.append("name", fileName);
        newForm.append("type", type);
        newForm.append("file", file);

        //UPLOAD IMAGE
        try {
            await axios.post("/upload", newForm);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSetFile = (e) => {
        const fileId = e.target.id;
        if (fileId === "profileImgfile") setProfileImgFile(e.target.files[0]);
        if (fileId === "coverImgfile") setCoverImgFile(e.target.files[0]);
        console.log(coverImgfile)
    }

    return (
        <div className="modalEditContainer">
            <button className="wallCenterButton" onClick={() => setOpen(true)}>
                <Edit className="wallCenterButtonIcon" />
                <span className="wallCenterButtonText">Edit Profile</span>
            </button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="modalEdit">
                    <div className="modalEditTop">
                        <span className="modalEditTitle">
                            Edit Profile
                        </span>
                    </div>
                    <Divider />
                    <form className="modalEditCenter" onSubmit={handleSave} >
                        {/* PROFILE PICTURE */}
                        <div className="editItem">
                            <div className="editItemTop">
                                <div className="editItemTitle">Profile Picture</div>
                                {!profileImgfile
                                    ? <label htmlFor="profileImgfile">
                                        <Edit className="editItemIcon" />
                                    </label>
                                    : <Cancel onClick={() => setProfileImgFile(null)} />
                                }
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="profileImgfile"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={handleSetFile} />
                            </div>
                            <div className="editItemContent" style={{ textAlign: "center" }}>
                                {!profileImgfile
                                    ? <ProfilePicture profilePicture={wallUser.profilePicture} size="200px" />
                                    : <ProfilePicture url={URL.createObjectURL(profileImgfile)} size="200px" />}
                            </div>
                        </div>

                        <Divider />

                        {/* COVER PICTURE */}
                        <div className="editItem">
                            <div className="editItemTop">
                                <div className="editItemTitle">Cover Picture</div>
                                {!coverImgfile
                                    ? <label htmlFor="coverImgfile">
                                        <Edit className="editItemIcon" />
                                    </label>
                                    : <Cancel onClick={() => setCoverImgFile(null)} />
                                }
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="coverImgfile"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={handleSetFile} />
                            </div>
                            <div className="editItemContent" style={{ textAlign: "center" }}>
                                <img
                                    className="editCoverPicture"
                                    src={
                                        coverImgfile
                                            ? URL.createObjectURL(coverImgfile)
                                            : (wallUser.coverPicture
                                                ? PF + wallUser.coverPicture
                                                : PF + "person/noCover.jpeg")
                                    }
                                    alt=""
                                />
                            </div>
                        </div>
                        <Divider />

                        {/* USER INFO*/}
                        <div className="editItem">
                            <div className="editItemTop">
                                <div className="editItemTitle">Your Information</div>
                                <Refresh className="editItemIcon" onClick={initFieldValue} />
                            </div>
                            <div className="editItemContent">
                                <div className="userInfo">
                                    <AccountCircle className="userInfoIcon" />
                                    <span className="userInfoText">Name</span>
                                    <input type="text"
                                        className="fieldInput"
                                        value={nameField}
                                        onChange={(e) => setNameField(e.target.value)}
                                    />
                                </div>

                                <div className="userInfo">
                                    <Home className="userInfoIcon" />
                                    <span className="userInfoText">Lives in </span>
                                    <input type="text"
                                        className="fieldInput"
                                        value={cityField}
                                        onChange={(e) => setCityField(e.target.value)}
                                    />
                                </div>
                                <div className="userInfo">
                                    <LocationOn className="userInfoIcon" />
                                    <span className="userInfoText">From </span>
                                    <input type="text"
                                        className="fieldInput"
                                        value={fromField}
                                        onChange={(e) => setFromField(e.target.value)}
                                    />
                                </div>

                                <div className="userInfo">
                                    <Work className="userInfoIcon" />
                                    <span className="userInfoText">Work at </span>
                                    <input type="text"
                                        className="fieldInput"
                                        value={workAtField}
                                        onChange={(e) => setWorkAtField(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="buttons">
                            <button type="submit"
                                className="saveButton">
                                Save
                            </button>
                            <button
                                className="cancelButton">
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div className="modalEditBottom">
                    </div>
                </div>
            </Modal>
        </div>

    )
}
