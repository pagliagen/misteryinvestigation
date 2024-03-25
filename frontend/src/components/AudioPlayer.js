import React, { useEffect, useRef, useState } from "react";
import { useGlobalState } from "../context/GlobalStateContext";
import "./AudioPlayer.css";

function AudioPlayer() {
  const { audioStreaming } = useGlobalState();
  const [sound, setSound] = useState(null);
  const [currentVolume, setCurrentVolume] = useState(50);
  const audioRef = useRef(null);

  useEffect(() => {
    const volume = localStorage.getItem("masterVolume") || 50;
    if (audioStreaming) {
      if (sound?._id !== audioStreaming._id) {
        setSound(audioStreaming);
        setCurrentVolume(volume);
      }
    } else {
      setSound(null);
    }
  }, [audioStreaming, sound]);

  useEffect(() => {
    if (sound) {
      const volume = localStorage.getItem("masterVolume") || 50;
      audioRef.current.src = sound.filePath;
      setCurrentVolume(volume);
    }
  }, [sound]);

  useEffect(() => {
    console.log('**** currentVolume', currentVolume)
    if (audioRef.current) {
      localStorage.setItem("masterVolume", currentVolume);
      audioRef.current.volume = currentVolume / 100
    }
  }, [currentVolume]);

  const handlePlayAudio = () => {
    if (sound) {
      audioRef.current.src = sound.filePath;
      audioRef.current.play();
    }
  };

  return (
    <div className="audio-player">
      {sound && (
        <audio ref={audioRef} controls hidden autoPlay={true} >
          <source src={sound.filePath} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      {sound && (
        <div className="audio-player-content">
          <button onClick={() => handlePlayAudio() || null}>Play</button>
          <button onClick={() => audioRef.current?.pause() || null}>
            Pause
          </button>
          <span>{currentVolume}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={currentVolume}
            onChange={(e) => setCurrentVolume(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;
