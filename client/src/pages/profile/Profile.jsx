import React from 'react';
import { Feed } from '../../components/feed/Feed';
import { ProfileWall } from '../../components/profileWall/ProfileWall';
import { Rightbar } from '../../components/rightbar/Rightbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Topbar } from '../../components/topbar/Topbar';
import './profile.css';

export const Profile = () => {
    return (
        <>
            <Topbar />
            <div className="profile">
                {/* <Sidebar /> */}
                <ProfileWall />
            </div>
        </>

    )
}
