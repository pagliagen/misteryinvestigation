import React, { useState } from "react";
import FileUpload from "./FileUpload";

function FileGroup({
  group,
  files,
  activeFile,
  activeGroup,
  showItem,
  handleClickFile,
  openSection,
}) {
  const [filePath, setFilePath] = useState("");

  const toggleOpen = (group) => {
    const getParentDirectory = (filePath) => {
      const lastIndex = filePath.lastIndexOf("/");
      if (lastIndex !== -1) {
        return filePath.substring(0, lastIndex);
      }
      return filePath;
    };

    openSection(group);
    setFilePath(getParentDirectory(files[0].filePath));
  };

  if (showItem === "group") {
    return (
      <div
        className={
          group === activeGroup ? "file-group open" : "file-group closed"
        }
        onClick={() => toggleOpen(group)}
      >
        <div className="file-group-header_icon">
          {activeGroup && (
            <FileUpload groupName={activeGroup} filePath={filePath} />
          )}
        </div>
        <div className="file-group-header_title">{group}</div>
      </div>
    );
  } else {
    return (
      <>
        {group === activeGroup && (
          <>
            {files.map((file) => (
              <div
                key={file._id}
                className={
                  activeFile && activeFile._id === file._id
                    ? "file-group-content_file audio_playing"
                    : "file-group-content_file inactive"
                }
                onClick={() => handleClickFile(file)}
              >
                {file.fileTitle}{" "}
              </div>
            ))}
          </>
        )}
      </>
    );
  }
}

export default FileGroup;
