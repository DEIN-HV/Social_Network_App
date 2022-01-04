import "./groupConversation.css";
import { Group, AddCircle, Edit, CheckCircle, Delete } from "@mui/icons-material";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { FriendList } from "../friendList/FriendList";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";

export const GroupConversation = (
    { groupConversations,
        setGroupConversations,
        openCreateGroupChat,
        setOpenCreateGroupChat,
        groupName,
        setGroupName,
        groupConversationMemberInfos,
        setGroupConversationMemberInfos,
        isEdit,
        setIsEdit,
        groupNameTitle,
        setGroupNameTitle
    }) => {

    const location = useLocation();
    const history = useHistory();
    const groupConversation = location.groupConversation;
    const [addMemberOpen, setAddMemberOpen] = useState(false);
    const { user } = useContext(AuthContext)

    //CHECK FRIEND
    const [checkedFriends, setCheckedFriends] = useState(groupConversationMemberInfos);

    useEffect(() => {
        setCheckedFriends(groupConversationMemberInfos);
    }, [groupConversationMemberInfos])

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
    }

    const handleCancelCreate = () => {
        refreshForm();
        setOpenCreateGroupChat(false);
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        setOpenCreateGroupChat(false);

        let memberIdList = [];
        checkedFriends.map((u) => memberIdList.push(u._id));

        try {
            const res = await axios.post("/conversations/group", {
                members: [user._id, ...memberIdList],
                name: groupName
            });
            setGroupConversations((prev) => [...prev, res.data]);
            setCheckedFriends([])
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setOpenCreateGroupChat(false);

        let memberIdList = [];
        checkedFriends.map((u) => memberIdList.push(u._id));
        // groupConversationMemberInfos.map((u) => memberIdList.push(u._id));

        try {
            const res = await axios.put("/conversations/group/" + groupConversation._id, {
                members: memberIdList,
                name: groupName
            });
            setGroupConversations((prev) => prev.filter((c) => c._id !== groupConversation._id));
            setGroupConversations((prev) => [...prev, res.data]);
            setGroupNameTitle(res.data.name);
            setGroupName(res.data.name);
            setCheckedFriends([])
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemove = async () => {
        //close popup
        handleCancelCreate();

        try {
            await axios.delete("/conversations/group/" + groupConversation._id);
            setGroupConversations((prev) => prev.filter(x => x._id !== groupConversation._id));
        } catch (error) {
            console.log(error)
        }
        history.push("/messenger")
    }

    const hanldeOpenCreateGroupChat = () => {
        setIsEdit(false);
        refreshForm();
        setOpenCreateGroupChat(true);
    }

    const refreshForm = () => {
        setGroupName("");
        setCheckedFriends([]);
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
                <div className="groupConversation" onClick={hanldeOpenCreateGroupChat}>
                    <AddCircle className="groupConversationIcon" />
                    <span className="groupConversationText" >Create New Group</span>
                </div>
            </div>

            <Modal open={openCreateGroupChat} onClose={() => setOpenCreateGroupChat(false)}>
                <form className="modalAddGroup" onSubmit={isEdit ? handleEdit : handleCreate}>
                    <div className="modalAddGroupTop">
                        {isEdit ? "Edit Group" : "Create New Group"}
                    </div>
                    <Divider />

                    <div className="modalAddGroupCenter">
                        <input className="nameInput"
                            placeholder="Enter Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required />

                        <div className="addedMembersContainer">
                            <>
                                {
                                    checkedFriends.map((friend) => (
                                        <div className="addedMembers">
                                            <ProfilePicture profilePicture={friend.profilePicture} size="40px" />
                                            <span className="addedMembersUsername">{friend.username}</span>
                                        </div>
                                    ))
                                }
                            </>
                        </div>

                        <div className="centerGroupButton" onClick={() => setAddMemberOpen(true)}>
                            {checkedFriends.length > 0
                                ? <Edit className="groupConversationIcon" />
                                : <AddCircle className="groupConversationIcon" />
                            }
                            <div className="groupButtonText" >
                                {checkedFriends.length > 0 ? "Edit members" : "Add member"}
                            </div>
                        </div>

                        {(groupConversationMemberInfos.length && isEdit) > 0 &&
                            <div className="centerGroupButton removeButton" onClick={handleRemove}>
                                <Delete className="groupConversationIcon" />
                                <div className="groupButtonText" >
                                    Remove Group
                                </div>
                            </div>
                        }
                    </div>

                    <div className="modalAddGroupBottom">
                        <div className="buttons">
                            <button type="submit"
                                className="saveButton">
                                Save
                            </button>
                            <button
                                className="cancelButton" onClick={handleCancelCreate}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>

            <Modal open={addMemberOpen} onClose={() => setAddMemberOpen(false)}>
                <div className="modalAddMember">
                    <CheckCircle className="cancelIcon" onClick={() => setAddMemberOpen(false)} />
                    <div className="modalAddMemberCenter">
                        <FriendList type={2} onCheckFriend={handleCheckFriend} checkedFriends={checkedFriends} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
