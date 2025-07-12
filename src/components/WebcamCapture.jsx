// components/WebcamCapture.jsx
"use client";

import { useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";

export default function WebcamCapture({ onCapture }) {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current?.getScreenshot();
    if (imgSrc) onCapture(imgSrc);
  }, [onCapture]);

  useEffect(() => {
    const t = setTimeout(capture, 500);
    return () => clearTimeout(t);
  }, [capture]);

  return (
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={{ facingMode: "user" }}
      style={{ display: "none" }}
    />
  );
}
