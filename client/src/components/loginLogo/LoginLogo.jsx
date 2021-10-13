import "./loginLogo.css"

export const LoginLogo = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="loginLogo">
            <div className="loginLogoWrapper">
                <img src={`${PF}/logo.png`}
                    className="logoImgLogin" />
                <h3 className="logoTextLogin">Travel Blog</h3>
            </div>

            <span className="loginDesc">
                Connect with friends on around the world anh share your exciting Trips.
            </span>
        </div>
    )
}
