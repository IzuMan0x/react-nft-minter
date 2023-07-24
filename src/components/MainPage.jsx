import { useState } from "react";

import styles from "./MainPage.module.css";

import { Web3Button } from "@web3modal/react";

/* File input handler the SVG input and the nftDescription Input */
import FileInput from "./file-upload/FileInput";

/*Just for diplay the uploaded svg on the webpage */
import DisplaySVG from "./file-upload/DisplaySvg";

/* Hooks from WAGMI helps build a better state feedback */
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
/* Contract abi location  **Note the ABI needs to be an array to be used with viem or wagmi*/
import createSvgNftAbi from "../assets/contract-abi/create-svg-abi.json";

/* Main Component */
export default function MainPage() {
  const [svgFile, setSvgFile] = useState(null);
  const [svgText, setSvgText] = useState(null);
  const [nftDescription, setNftDescription] = useState("");

  //Wagmi hook for checking if the wallet is connected
  const { isConnected } = useAccount();

  const handleFileChange = async (file) => {
    const fileText = await file.text();
    /* This is for displaying the svg on the webpage */
    setSvgFile(file);

    /* This is for preparig the svg file to send to the smart contract */
    setSvgText(fileText);
  };

  const descriptionChangeHandler = (input) => {
    setNftDescription(input);
  };

  /* Preparing the contract to write */
  //Contract Address for create-svg-nft contract
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: createSvgNftAbi,
    functionName: "mintNft",
    args: [svgText, nftDescription],
    onSuccess(data) {
      console.log("Success", data.result);
    },
  });

  if (error) {
    /* should make this into into a popup modal */
    console.log(error);
  }

  /* For some reason when we call the write method to read from the contract it costs gas, thus we can use useContractRead or just get the result from prepareContractWrite */
  const {
    data,
    isSuccess,
    isLoading,
    write: mintNft,
  } = useContractWrite(config);
  console.log(`transaction receipt ${isSuccess}`);

  /* Conditional displays for the mint button states */
  const mintButton = () => {
    if (isLoading) {
      return "minting";
    }
    if (!isConnected) {
      return "Please connect your Wallet";
    }
    if (isConnected && !isLoading) {
      return "Mint";
    }
  };

  //For testing purposes
  console.log(
    `The length the nft description is ${nftDescription.trim().length}`
  );

  return (
    <>
      <Web3Button />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          padding: "20px",
        }}
      >
        <DisplaySVG svgFile={svgFile} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          padding: "20px",
        }}
      >
        <FileInput
          onFileChange={handleFileChange}
          onDescriptionChange={descriptionChangeHandler}
        />
      </div>

      <button
        className={`${styles["retro-button"]} rounded-full disabled:cursor-not-allowed`}
        disabled={!mintNft || isLoading || nftDescription.trim().length == 0}
        onClick={() => mintNft?.()}
      >
        {mintButton()}
      </button>
    </>
  );
}
