import React from "react";
import Tilt from "react-tilt";

import brain from './brain.png';
import './logo.styles.scss';

const Logo = () => (
  <div className="logo">
    <Tilt
      className="Tilt"
      options={{ max: 30 }}
      style={{ height: 120, width: 120 }}
    >
      <div className="Tilt-inner"><img alt='brain' src={brain} /></div>
    </Tilt>
  </div>
);

export default Logo;
