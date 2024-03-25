import React, { useEffect, useState } from "react";
import FileGroup from "./FileGroup";
import { useGlobalState } from "../context/GlobalStateContext";
import Slider from "react-slick";

function FileExplorer() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const { listAudios, socket, sendSocketMessage, isMobile } = useGlobalState();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    afterChange: (index) => {
      console.log("afterChange slide index:", index);
    },
    beforeChange: (current, next) => {
      console.log("beforeChange slide index:", current, next);
    },
  };

  const handleClickFile = (file) => {
    if (activeFile) {
      if (activeFile._id === file._id) {
        setActiveFile(null);
        sendSocketMessage("AUDIO_STOP", null);
      } else {
        setActiveFile(file);
        sendSocketMessage("AUDIO_PLAY", { file });
      }
    } else {
      setActiveFile(file);
      sendSocketMessage("AUDIO_PLAY", { file });
    }
  };

  useEffect(() => {
    if (listAudios) {
      setActiveGroup(listAudios[0].groupName);
    }
  }, [listAudios, setActiveGroup]);

  const groupAudioFiles = () => {
    const groups = {};
    if (listAudios !== null) {
      listAudios.forEach((file) => {
        if (!groups[file.groupName]) {
          groups[file.groupName] = [file];
        } else {
          groups[file.groupName].push(file);
        }
      });
    }
    return groups;
  };

  return (
    <div className={`file-explorer-wrapper ${socket ? "online" : "offline"}`}>
      {isMobile && (
        <div className="file-explorer mobile">
          <Slider {...settings}>
            {Object.entries(groupAudioFiles()).map(([groupName, files]) => (
              <div
                className="file-explorer-mobile-grouplist"
                key={`slider-${groupName}`}
              >
                <div className="file-explorer-mobile-grouplist_header">
                  {groupName}
                </div>
                <div className="file-explorer-mobile-grouplist_content">
                  <FileGroup
                    key={`grouplistmobile-${groupName}`}
                    group={groupName}
                    files={files}
                    activeFile={activeFile}
                    activeGroup={groupName}
                    showItem="detail"
                    handleClickFile={handleClickFile}
                    openSection={(group) => {
                      setActiveGroup(group);
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      {!isMobile && (
        <div className="file-explorer desktop">
          <div className="file-explorer-grouplist">
            {Object.entries(groupAudioFiles()).map(([groupName, files]) => (
              <FileGroup
                key={`grouplist-${groupName}`}
                group={groupName}
                files={files}
                activeFile={activeFile}
                activeGroup={activeGroup}
                showItem="group"
                handleClickFile={handleClickFile}
                openSection={(group, section) => {
                  setActiveGroup(group);
                }}
              />
            ))}
          </div>
          <div className="file-explorer-detail">
            <div className="file-explorer-detail-content">
              {Object.entries(groupAudioFiles()).map(([groupName, files]) => (
                <FileGroup
                  key={`groupdetail-${groupName}`}
                  group={groupName}
                  files={files}
                  activeFile={activeFile}
                  activeGroup={activeGroup}
                  showItem="detail"
                  handleClickFile={handleClickFile}
                  openSection={(group) => {
                    setActiveGroup(group);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileExplorer;
