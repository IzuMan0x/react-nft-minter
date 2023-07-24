import React, { useState } from "react";

import styles from "./FileInput.module.css";

const FileInput = ({ onFileChange, onDescriptionChange }) => {
  const [inputValidity, setInputValidity] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  const descriptionChangeHandler = (event) => {
    onDescriptionChange(event.target.value);
  };

  const inputHandler = (event) => {
    if (event.target.vale.trim().length == 0) {
      setInputValidity(false);
    }
  };

  return (
    <>
      <div className="rounded-full">
        <input
          className={`${styles["retro-button"]} rounded-full block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        cursor-pointer `}
          title=" "
          type="file"
          accept=".svg"
          onChange={handleFileChange}
        />
        <input
          type="text"
          className="mt-3 justify-center items-center flex content-center bg-o"
          placeholder="Enter a Description"
          onChange={descriptionChangeHandler}
          onBlur={inputHandler}
        />
      </div>
    </>
  );
};

export default FileInput;
