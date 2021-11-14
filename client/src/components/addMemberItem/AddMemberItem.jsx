import { Checkbox } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React, { useState } from 'react'

export const AddMemberItem = ({ friend, onCheckFriend }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (

        <li key={friend._id} className="friendListItem">
            <Checkbox color="primary" className="groupConversationIcon"
                onChange={(e) => onCheckFriend(e, friend._id, friend.profilePicture, friend.username)} />
            <img src={friend.profilePicture
                ? PF + friend.profilePicture
                : PF + "person/noAvatar.png"}
                alt=""
                className="friendListAvt"
            />
            {friend.isOnline &&
                <span className="rightbarOnline"></span>
            }
            <span className="friendListName">{friend.username}</span>
        </li>
    )
}
