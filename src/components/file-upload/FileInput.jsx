import React, { useState } from "react";

import styles from "./FileInput.module.css";

const FileInput = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  return (
    <div>
      <input
        className={styles["retro-button"]}
        title=" "
        type="file"
        accept=".svg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
