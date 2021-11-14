import { AttachFile, EmojiEmotions, PermMedia } from "@material-ui/icons";
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


export const Messenger = () => {
    const { user } = useContext(AuthContext);
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMess, setArrivalMess] = useState(null);
    const [groupConversations, setGroupConversations] = useState([]);
    const [groupConversationMemberInfos, setGroupConversationMemberInfos] = useState([]);
    const messageRef = useRef();
    const scrollRef = useRef();
    const location = useLocation();
    const receiver = location.receiver;
    const type = location.type;
    const groupConversation = location.groupConversation;

    const socket = useRef();

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

        if (text) {
            try {
                const newMess = {
                    conversationId: type === 1 ? conversation._id : groupConversation._id,
                    sender: user._id,
                    text: text,
                }
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
                        profilePicture: data.profilePicture
                    })
            ));
            setGroupConversationMemberInfos(infoArr)
        } catch (error) {
            console.log(error)
        }
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
                            <GroupConversation groupConversations={groupConversations} />
                        </div>
                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
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
                            <PermMedia htmlColor="tomato" className="shareOptionIcon" />
                            <AttachFile htmlColor="blue" className="shareOptionIcon" />
                            <EmojiEmotions htmlColor="goldenrod" className="shareOptionIcon" />
                            <input
                                className="chatMessageInput"
                                placeholder="write something..."
                                ref={messageRef}
                            ></input>
                            <button className="chatSubmitButton" type="submit">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
                <div className="chatFriendInfo">
                    <ProfileInfo user={receiver} hasPicture={true} />
                </div>
            </div>
        </>
    )
}
