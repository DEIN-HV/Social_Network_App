import { Checkbox } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React, { useState } from 'react'
import "./addMemberItem.css"

export const AddMemberItem = ({ friend, onCheckFriend, checkedFriends }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //HANDLE INIT CHECKED
    let checkedIdList = []
    checkedFriends.map((checkedFriend) => checkedIdList.push(checkedFriend._id));
    const isChecked = checkedIdList.includes(friend._id);

    return (
        <li key={friend._id} className="friendListItem">
            <Checkbox color="primary"
                className="groupConversationIcon"
                checked={isChecked}
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
            <span className="addfriendListName">{friend.username}</span>
        </li>
    )
}
