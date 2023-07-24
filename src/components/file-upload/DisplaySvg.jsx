import React from "react";

import styles from "./DisplaySvg.module.css";

const DisplaySVG = ({ svgFile }) => {
  return (
    <div className={`${styles["image-container"]} drop-shadow-3xl`}>
      {svgFile ? (
        <img src={URL.createObjectURL(svgFile)} alt="SVG Preview" />
      ) : (
        <p className={styles["cyberpunk-text"]}>Upload an SVG</p>
      )}
    </div>
  );
};

export default DisplaySVG;
