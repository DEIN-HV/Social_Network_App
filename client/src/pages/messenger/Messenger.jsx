import { AttachFile, EmojiEmotions, PermMedia, CropLandscapeRounded, Group, Edit, Cancel } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FriendList } from "../../components/friendList/FriendList";
import { Message } from "../../components/message/Message";
import { ProfileInfo } from "../../components/profileInfo/ProfileInfo";
import { Topbar } from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/authContext/AuthContext";
import { io } from "socket.io-client";
import "./messenger.css";
import { GroupConversation } from "../../components/groupConversation/GroupConversation";
import { ProfilePicture } from "../../components/profilePicture/ProfilePicture";
import Picker from 'emoji-picker-react';
import { Webcam } from "../../components/webcam/Webcam";


export const Messenger = () => {
    const location = useLocation();
    const groupConversation = location.groupConversation

    const { user } = useContext(AuthContext);
    const [infoUserOpen, setInfoUserOpen] = useState(true);
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMess, setArrivalMess] = useState(null);
    const [groupConversations, setGroupConversations] = useState([]);
    const [groupConversationMemberInfos, setGroupConversationMemberInfos] = useState([]);
    const [openCreateGroupChat, setOpenCreateGroupChat] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupNameTitle, setGroupNameTitle] = useState();
    const [openEmoji, setOpenEmoji] = useState(false);
    const [file, setFile] = useState("");

    const messageRef = useRef();
    const scrollRef = useRef();
    const emojiRef = useRef();
    const socket = useRef();

    const receiver = location.receiver;
    const type = location.type;

    // //GET NEW MESSAGE FROM WEB SOCKET
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (newMessage) => {
            setArrivalMess(newMessage);
        });
        fetchGroupConversation();
    }, []);

    //DISPLAY REAL TIME NEW MESS
    useEffect(() => {
        arrivalMess &&
            (type === 1 ? conversation : groupConversation)?.members.includes(arrivalMess.sender) &&
            setMessages([...messages, arrivalMess]);
    }, [arrivalMess, conversation]);

    useEffect(() => {
        fetchConversation();
        setMessages([]);
    }, [receiver]);

    useEffect(() => {
        fetchMemberInfoInGroupChat();
        setMessages([]);
        setGroupNameTitle(groupConversation ? groupConversation.name : "");
    }, [groupConversation])

    useEffect(() => {
        fetchMessages();
    }, [conversation, groupConversation]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation, messages]);

    //FECTH NEW CONVERSATION
    const fetchConversation = async () => {
        try {
            const res = await axios.get(`/conversations/find/${user._id}/${receiver._id}`);
            setConversation(res.data);
            if (!res.data) {
                const res = await axios.post('/conversations', {
                    senderId: user._id,
                    receiverId: receiver._id,
                });
                setConversation(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //FETCH GROUP CONVERSATION 
    const fetchGroupConversation = async () => {
        try {
            const res = await axios.get(`/conversations?type=2&userId=${user._id}`);
            setGroupConversations(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    //FETCH MESS
    const fetchMessages = async () => {
        const chat = (type === 1 ? conversation : groupConversation)
        if (chat) {
            try {
                const res = await axios.get(`/messages/${chat._id}`);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    //SUBMIT NEW MESS
    const handleMessSubmit = async (e) => {
        e.preventDefault();
        const text = messageRef.current.value;

        const newMess = {
            conversationId: type === 1 ? conversation._id : groupConversation._id,
            sender: user._id,
        }

        //UPLOAD FILE
        if (file) {
            const newForm = new FormData();
            const fileName = Date.now() + file.name;
            newMess.img = "conversation/" + fileName;
            newForm.append("type", "conversation/");
            newForm.append("name", fileName);
            newForm.append("file", file);
            try {
                await axios.post("/upload", newForm);
                setFile("");
            } catch (error) {
                console.log(error);
            }
        }

        if (text || file) {
            try {
                newMess.text = text;
                const res = await axios.post("/messages", newMess);
                // setMessages([...messages, res.data])
                messageRef.current.value = "";

                socket.current.emit("addMessage", res.data);
            } catch (error) {
                console.log(error)
            }
        }
    }

    //FETCH MEMBER INFO IN GROUP CHAT
    const fetchMemberInfoInGroupChat = async () => {
        try {
            const memberInfos = await Promise.all(
                groupConversation.members.map((member) => (
                    axios.get("/users?userId=" + member)
                ))
            )
            let infoArr = []
            memberInfos.map(({ data }) => (
                infoArr.push(
                    {
                        _id: data._id,
                        profilePicture: data.profilePicture,
                        username: data.username
                    })
            ));
            setGroupConversationMemberInfos(infoArr)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenEditGroupChatModal = () => {
        setOpenCreateGroupChat(true);
        setGroupName(groupConversation.name);
        setIsEdit(true);
        console.log(groupConversationMemberInfos)
    }

    //CLOSE EMOJI WHEN CLICK OUTSIDE
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (openEmoji && emojiRef.current && !emojiRef.current.contains(e.target)) {
                setOpenEmoji(false)
            }
        }
        //bind the listener event
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [openEmoji]);

    const handleChoseEmoji = (e, emojiObject) => {
        messageRef.current.value += emojiObject.emoji;
    }

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <div className="chatMenuItem">
                            <span className="chatMenuTitle">Contacts</span>
                            <FriendList friendListType={1} />
                        </div>
                        <div className="chatMenuItem">
                            <span className="chatMenuTitle">Group conversations</span>
                            <GroupConversation
                                openCreateGroupChat={openCreateGroupChat}
                                setOpenCreateGroupChat={setOpenCreateGroupChat}
                                groupConversations={groupConversations}
                                setGroupConversations={setGroupConversations}
                                groupName={groupName}
                                setGroupName={setGroupName}
                                groupConversationMemberInfos={groupConversationMemberInfos}
                                setGroupConversationMemberInfos={setGroupConversationMemberInfos}
                                isEdit={isEdit}
                                setIsEdit={setIsEdit}
                                groupNameTitle={groupNameTitle}
                                setGroupNameTitle={setGroupNameTitle} />

                        </div>
                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            {type === 1 &&
                                <div className="chatBoxTopWrapper">
                                    <div className="chatBoxTopLeft">
                                        <ProfilePicture profilePicture={receiver.profilePicture} size="40px" />
                                        <span className="chatBoxTopText">{receiver.username} </span>
                                    </div>
                                    <div className={`chatBoxTopLeftIcon${infoUserOpen ? " active" : ""}`}>
                                        <CropLandscapeRounded onClick={() => setInfoUserOpen(!infoUserOpen)} />
                                    </div>
                                </div>
                            }
                            {type === 2 &&
                                <div className="chatBoxTopLeft">
                                    <Group />
                                    <span className="chatBoxTopText" onClick={handleOpenEditGroupChatModal}>{groupNameTitle} </span>
                                </div>
                            }
                        </div>

                        <div className="chatBoxCenter">
                            {
                                messages.map((message) => (
                                    <div ref={scrollRef}>
                                        <Message
                                            key={message._id}
                                            message={message}
                                            own={message.sender == user._id}
                                            type={type}
                                            receiverInfo={receiver ? receiver.profilePicture : receiver}
                                            groupConversationMemberInfos={groupConversationMemberInfos}
                                        />
                                    </div>
                                ))
                            }

                        </div>
                        <form className="chatBoxBottom" onSubmit={handleMessSubmit}>
                            <label htmlFor="file" className="icon">
                                <PermMedia htmlColor="tomato" className="shareOptionIcon" />
                                {/* <AttachFile htmlColor="blue" className="shareOptionIcon" /> */}
                            </label>
                            <input
                                id="file"
                                type="file"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <EmojiEmotions htmlColor="goldenrod" className="icon" onClick={() => setOpenEmoji(!openEmoji)} />
                            {openEmoji &&
                                <div className="emojiPicker" ref={emojiRef} >
                                    <Picker onEmojiClick={handleChoseEmoji} />
                                </div>
                            }
                            <input
                                className="chatMessageInput"
                                placeholder="write something..."
                                ref={messageRef}
                            />
                            <button className="chatSubmitButton" type="submit">
                                Send
                            </button>
                        </form>

                        {
                            file &&
                            <div className="imgReviewContain">
                                <img className="imgReview" src={URL.createObjectURL(file)} />
                                <Cancel className="imgReviewCancelIcon" onClick={() => setFile("")} />
                            </div>
                        }
                    </div>
                </div>
                {(infoUserOpen && type === 1) &&
                    <div className="chatFriendInfo">
                        <ProfileInfo user={receiver} hasPicture={true} />
                    </div>

                }
            </div>
        </>
    )
}
