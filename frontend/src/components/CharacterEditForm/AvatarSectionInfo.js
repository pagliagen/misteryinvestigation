import React, { useState } from "react";

function AvatarSectionInfo({ payload, handleChangeSectionInfo }) {
  const [linkAvatar, setLinkAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleUpdateSectionInfo = (e) => {
    if (!payload) return;

    handleChangeSectionInfo({
      target: {
        name: "characterInfo",
        value: {
          ...payload,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleLinkAvatar = (value, file) => {
    console.log("handleLinkAvatar", value, file);
    setLinkAvatar(value);
    handleChangeSectionInfo({
      target: {
        name: "characterInfo",
        value: {
          ...payload,
          avatar: value,
        },
      },
    });
 
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    console.log("handleUploadFile", linkAvatar);
  };

  return (
    <div> 
      <div>
        <label htmlFor="avatar">Link Avatar:</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          placeholder="Link Avatar"
          onChange={(e) => handleLinkAvatar(e.target.value, e.target.files[0])}
        />
        {linkAvatar && (
          <button onClick={handleUploadFile}>Carica</button>
        )}
      </div>
      {preview && (
      <div>
        <img src={preview} alt="Avatar" />
      </div>
      )}
    </div>

  );
}

export default AvatarSectionInfo;
