import './profilePicture.css'

export const ProfilePicture = ({ profilePicture, size, url }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <img
            className="profilePicture"
            style={{ height: size, width: size }}
            src={
                url ? url
                    : (profilePicture
                        ? PF + profilePicture
                        : PF + "person/noAvatar.png")
            }
            alt=""

        />
    )
}
