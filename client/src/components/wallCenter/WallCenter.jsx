import { AddBox, ArrowDropDown, Chat, Edit, MoreHoriz } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import FollowButton from "../followButton/FollowButton";
import { ModalEditProfile } from "../modalEditProfile/ModalEditProfile";
import "./wallCenter.css";

export const WallCenter = ({ wallUser }) => {
    const { id } = useParams();
    const { user, dispatch } = useContext(AuthContext);
    const [isMine, setIsMine] = useState(false);
    const history = useHistory();

    // <Link key={friend._id} to={{ pathname: `/messenger/${friend._id}`, receiver: friend }} className="link">

    useEffect(() => {
        setIsMine(user._id === id);
    }, [user, id])

    return (
        <div className="wallCenter">
            <div className="wallCenterLinks">
                <span className="wallCenterLink">Posts</span>
                <span className="wallCenterLink">About</span>
                <span className="wallCenterLink">Friends</span>
                <span className="wallCenterLink">Photos</span>
                <span className="wallCenterLink">Videos</span>
                <span className="wallCenterLink">More<ArrowDropDown /></span>
            </div>

            {isMine
                ? <div className="wallCenterButtons">
                    <button className="wallCenterButton" >
                        <AddBox className="wallCenterButtonIcon" />
                        <span className="wallCenterButtonText">Add Story</span>
                    </button>

                    <ModalEditProfile wallUser={wallUser} />

                    <button className="wallCenterButton">
                        <MoreHoriz className="wallCenterButtonIcon" />
                    </button>
                </div>

                : <div className="wallCenterButtons">
                    <FollowButton followTargetId={id} />

                    <button className="wallCenterButton"
                        onClick={() => history.push({ pathname: `/messenger/${id}`, receiver: wallUser })}
                    >
                        <Chat className="wallCenterButtonIcon" />
                        <span className="wallCenterButtonText">Message</span>
                    </button>

                    <button className="wallCenterButton">
                        <MoreHoriz className="wallCenterButtonIcon" />
                    </button>
                </div>
            }


        </div>
    )
}
