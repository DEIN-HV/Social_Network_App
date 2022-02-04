import "./webcam.css"
import { Modal } from "@material-ui/core";
import { useCallback, useRef, useState } from "react";
import WebcamCapture from "react-webcam";
import { CameraAlt, Cancel, Send } from "@material-ui/icons";
import { Replay } from "@mui/icons-material";

export const Webcam = ({ webcamRef, onHandleCloseCaptureModal, capturedPhoto, onCapture, onSendCapturePhoto, onReCapture }) => {
    const videoConstraints = {
        width: 500,
        height: 400,
        facingMode: "user"
    };

    return (
        <div className="modal cameraModal">


            {/* CAMERA SCREEN     */}
            <div className="cameraModalTop">
                <Cancel className="cameraCancelIcon" onClick={onHandleCloseCaptureModal} />

                {capturedPhoto ?
                    <img className="cameraCapture" src={capturedPhoto} alt="" />
                    :
                    <WebcamCapture
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="cameraCapture"
                    />
                }

            </div>

            {/* BUTTON */}
            <div className="cameraModalBottom">
                <div className="captureButton">
                    {capturedPhoto
                        ? <Send className="iconCapture" onClick={onSendCapturePhoto} />
                        : <CameraAlt className="iconCapture" htmlColor="blue" onClick={onCapture} />

                    }
                </div>
                {capturedPhoto && <Replay className="reCaptureButton" onClick={onReCapture} />}
            </div>
        </div>
    );
};
