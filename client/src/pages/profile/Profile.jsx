import React from 'react';
import { ProfileWall } from '../../components/profileWall/ProfileWall';
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
