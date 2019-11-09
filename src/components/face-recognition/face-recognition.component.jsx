import React from "react";

import "./face-recognition.styles.scss";

const FaceRecognition = ({ imgUrl, box }) => (
  <div className="face-recognition">
    <img id="inputImage" alt="" src={imgUrl} />
    <div
      style={{
        top: box.topRow,
        left: box.leftCol,
        bottom: box.bottomRow,
        right: box.rightCol
      }}
      className="box-boundary"
    ></div>
  </div>
);

export default FaceRecognition;
