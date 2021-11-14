import { ProfilePicture } from "../profilePicture/ProfilePicture";
import "./searchedUser.css";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import FollowButton from "../followButton/FollowButton";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { AccountCircle } from "@mui/icons-material"

const SearchedUser = ({ searchedUser }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className="searchedUser">
            <div className="seachedUserContainer">
                <div className="searchedUserLeft">
                    <Link to={`/profile/${searchedUser._id}`} className="link">
                        <ProfilePicture profilePicture={searchedUser.profilePicture} size="60px" />
                    </Link>
                    <div className="searchedUserInfo">
                        <div className="searchedMainText">
                            {searchedUser.username}
                        </div>
                        {searchedUser.workAt &&
                            <div className="searchedSubText">
                                Work at {searchedUser.workAt}
                            </div>
                        }
                        {searchedUser.city &&
                            <div className="searchedSubText">
                                Live in {searchedUser.city}
                            </div>
                        }
                    </div>
                </div>


                {user._id === searchedUser._id
                    ? <div className="searchedUserRight">
                        <AccountCircle style={{ fontSize: 40 }} />
                    </div>
                    : <div className="searchedUserRight">
                        <FollowButton followTargetId={searchedUser._id} />
                    </div>
                }
            </div>
            <Divider />
        </div>
    )
}

export default SearchedUser
