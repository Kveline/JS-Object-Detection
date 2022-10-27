import "./App.css";
import * as ml5 from "ml5";
import Webcam from "react-webcam";
import { useRef, useEffect } from "react";

function App() {
  const webcamRef = useRef();
  const videoConstraints = {
    height: 100,
    width: 100,
    facingMode: "environment",
  };

  useEffect(() => {
    let detectionInterval;

    // 1. Once the model has loaded, update the dimensions run the model's detection interval
    const modelLoaded = () => {
      detectionInterval = setInterval(() => {
        detect();
      }, 200);
    };
    const objectDetector = ml5.objectDetector("cocossd", modelLoaded);

    const detect = () => {
      if (webcamRef.current.video.readyState !== 4) {
        console.warn("Video not ready yet");
        return;
      }

      objectDetector.detect(webcamRef.current.video, (err, results) => {
        console.log(results);
      });
    };

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    };
  }, []);

  return (
    <div className="App">
      <Webcam ref={webcamRef} videoConstraints={videoConstraints} />
    </div>
  );
}

export default App;
