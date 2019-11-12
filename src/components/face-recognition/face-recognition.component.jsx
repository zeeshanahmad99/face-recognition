import React from "react";

import "./face-recognition.styles.scss";

const FaceRecognition = ({ imgUrl, boxes }) => (
  <div className="face-recognition">
    <img key={1} id="inputImage" alt="" src={imgUrl} />
    {boxes.map(box => (
      <div
        key={box.id}
        style={{
          top: box.topRow,
          left: box.leftCol,
          bottom: box.bottomRow,
          right: box.rightCol
        }}
        className="box-boundary"
      ></div>
    ))}
  </div>
);

export default FaceRecognition;
