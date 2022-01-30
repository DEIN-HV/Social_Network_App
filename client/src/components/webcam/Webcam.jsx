import { useCallback, useRef } from "react";
import WebcamCapture from "react-webcam";

export const Webcam = () => {
    const webcamRef = useRef(null);

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc);
        },
        [webcamRef]
    );

    const videoConstraints = {
        width: 580,
        height: 520,
        facingMode: "user"
    };

    return (
        <>
            <div>WEBCAM</div>
            <WebcamCapture
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
        </>
    );
};
