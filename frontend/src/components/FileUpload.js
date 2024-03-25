import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/audios";
import { useGlobalState } from "../context/GlobalStateContext";

const FileUpload = ({ groupName, filePath }) => {
  const { sendSocketMessage } = useGlobalState();

  const iconUpload =
    "data:image/png;base64,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";

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.type === "audio/mpeg") {
        await uploadFile(groupName, filePath, file);
        sendSocketMessage("REFRESH_AUDIOLIST", null);
      }
    },
    [groupName, filePath, sendSocketMessage]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <img src={iconUpload} alt="Upload" />
    </div>
  );
};

export default FileUpload;
