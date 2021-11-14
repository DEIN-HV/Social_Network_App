import "./groupConversation.css";
import { Group, AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { FriendList } from "../friendList/FriendList";
import { ProfilePicture } from "../profilePicture/ProfilePicture";

export const GroupConversation = ({ groupConversations }) => {
    const [open, setOpen] = useState(false);
    const [addMemberOpen, setAddMemberOpen] = useState(false);
    console.log(open)

    //CHECK FRIEND
    const [checkedFriends, setCheckedFriends] = useState([]);

    const handleCheckFriend = (e, friendId, friendImg, friendUsername) => {
        if (e.target.checked === true)
            setCheckedFriends((prevArr) => [...prevArr,
            {
                _id: friendId,
                profilePicture: friendImg,
                username: friendUsername
            }])
        else
            setCheckedFriends((prevArr) => prevArr.filter((u) => u._id !== friendId))
        console.log(checkedFriends)
    }

    return (
        <div className="groupConversations">
            {groupConversations.map((groupConversation) => (
                <Link className="link" to={
                    {
                        pathName: `/messenger/${groupConversation._id}`,
                        groupConversation: groupConversation,
                        receiver: null,
                        type: 2
                    }}>
                    <div className="groupConversation">
                        <Group className="groupConversationIcon" />
                        <span className="groupConversationText">{groupConversation.name}</span>
                    </div>
                </Link>

            ))
            }

            <div className="addNewGroupConversation">
                <div className="groupConversation" onClick={() => setOpen(true)}>
                    <AddCircle className="groupConversationIcon" />
                    <span className="groupConversationText" >Create New Group</span>
                </div>
            </div>

            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="modalAddGroup">
                    <div className="modalAddGroupTop">
                        Create New Group
                    </div>
                    <Divider />

                    <div className="modalAddGroupCenter">
                        <input className="nameInput"
                            placeholder="Enter Group Name" />

                        <div className="addedMembersContainer">
                            {
                                checkedFriends.map((friend) => (
                                    <div className="addedMembers">
                                        <ProfilePicture profilePicture={friend.profilePicture} size="30px" />
                                        <span className="addedMembersUsername">{friend.username}</span>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="groupConversation" onClick={() => setAddMemberOpen(true)}>
                            <AddCircle className="groupConversationIcon" />
                            <div className="groupConversationText" >Add user</div>
                        </div>

                    </div>
                </div>
            </Modal>

            <Modal open={addMemberOpen} onClose={() => setAddMemberOpen(false)}>
                <div className="modalAddGroup">
                    <FriendList type={2} onCheckFriend={handleCheckFriend} />
                </div>
            </Modal>


        </div>
    )
}
