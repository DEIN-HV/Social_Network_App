import { Person } from '@mui/icons-material'
import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { AddFriend, RemoveFriendRequestNoti, UnFollow } from '../../context/authContext/AuthAction'
import { AuthContext } from '../../context/authContext/AuthContext'
import { FriendRequest } from '../friendRequest/FriendRequest'
import './friendRequestList.css'

export const FriendRequestList = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [friendRequestIds, setFriendRequestIds] = useState(user.followers);
    const [openFriendRequest, setOpenFriendRequest] = useState(false);

    const friendRequestRef = useRef();

    //CLOSE NOTIFICATION WHEN CLICK OUTSIDE
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (openFriendRequest && friendRequestRef.current && !friendRequestRef.current.contains(e.target)) {
                setOpenFriendRequest(false)
            }
        }
        //bind the listener event
        document.addEventListener("mousedown", checkIfClickedOutside);

        // getFriendRequest();
    }, [openFriendRequest]);

    //GET FRIEND REQUEST
    useEffect(() => {
        setFriendRequestIds(user.followers)
    }, [user])

    // const getFriendRequest = async () => {
    //     try {
    //         const res = await axios.get("/users?userId=" + user._id);
    //         console.log(res.data)
    //         setFriendRequestIds(res.data.followers);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    //PROCESS FRIEND REQUEST
    const handleRequest = async (requestId, type) => {
        try {
            await axios.put(`/users/${requestId}/request`, {
                userId: user._id,
                type: type,
            });

            // setFriendRequestIds((requests) => requests.filter((rId) => rId !== requestId))

            dispatch(RemoveFriendRequestNoti(requestId))
            if (type === 1) dispatch(AddFriend(requestId));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="topbarIconItem">
                <Person onClick={() => setOpenFriendRequest(true)} />
                {friendRequestIds.length > 0 &&
                    <span className="topbarIconBadge">{friendRequestIds.length}</span>
                }
            </div>

            {openFriendRequest &&
                <div className="friendRequests" ref={friendRequestRef}>
                    <div className="friendRequestTitle">
                        Friend Request
                    </div>
                    {friendRequestIds.map((requestId) => (
                        <FriendRequest requestId={requestId} onHandleRequest={handleRequest} />
                    ))}
                </div>}
        </>
    )
}
