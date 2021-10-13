import './profilePicture.css'

export const ProfilePicture = ({ user, size }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <img
            className="profilePicture"
            style={{ height: size, width: size }}
            src={user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""

        />
    )
}
