import React from 'react';
import { Users } from '../../dummyData';
import './rightbar.css';

export const Rightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="rightBar">

            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img
                        className="birthdayImg"
                        src="https://webmau.webgiare.net/wp-content/uploads/2018/12/gift-icon.png"
                        alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
                    </span>
                </div>
                <img className="rightbarAd" src="https://media.istockphoto.com/photos/m-having-the-best-time-with-you-guys-picture-id1133362469?k=20&m=1133362469&s=612x612&w=0&h=OG6ws5XYoka77vTtK82dUqaldFAdJ8sqZmDJ9NSlUyo=" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">

                    {Users.map((user) => (
                        <li key={user.id} className="rigthbarFriend">
                            <div className="rightbarProfileContainer">
                                <img
                                    src={PF + user.profilePicture}
                                    className="rightbarProfileImg"
                                    alt={user.username}
                                />
                                <span className="rightbarOnline"></span>
                            </div>
                            <span className="rightbarUsername">{user.username}</span>
                        </li>
                    ))}



                </ul>
            </div>

        </div>
    )
}
