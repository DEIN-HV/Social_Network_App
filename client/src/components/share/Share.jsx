import React from 'react';
import './share.css';
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";

export const Share = () => {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
                        alt=""
                        className="shareProfileImg"
                    />
                    <input
                        type="text"
                        className="shareInput"
                        placeholder="What's in your mind"
                    />
                </div>

                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareOptionIcon" />
                            <span className="shareOptionText">
                                Photo or Video
                            </span>
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareOptionIcon" />
                            <span className="shareOptionText">
                                Tag
                            </span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareOptionIcon" />
                            <span className="shareOptionText">
                                Location
                            </span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareOptionIcon" />
                            <span className="shareOptionText">
                                Feeling
                            </span>
                        </div>
                    </div>
                    <button className="shareButton">
                        Share
                    </button>
                </div>

            </div>
        </div>
    )
}
