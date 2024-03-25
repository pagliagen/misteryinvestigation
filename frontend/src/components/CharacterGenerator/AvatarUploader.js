import React, { useState, useRef, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

const AvatarUploader = ({ avatar, setAvatar }) => {
  const editorRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Se un avatar è già stato passato in input, impostalo nel componente
    if (avatar) {
      setScale(1); // Resetta la scala quando un nuovo avatar viene caricato
    }
  }, [avatar]);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleScaleChange = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setAvatar(fileReader.result);
        };
        fileReader.readAsDataURL(blob);
      });
    }
  };

  return (
    <div className='editavatar'>
      {avatar ? (
        <div className='editavatar-content'>
          <AvatarEditor
            ref={editorRef}
            image={avatar}
            width={396}
            height={517}
            border={10}
            color={[255, 255, 255, 0.6]}  
            scale={scale}
            rotate={0}
          />
          <div className='editavatar-buttons'>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={scale}
            onChange={handleScaleChange}
          />
          <button onClick={handleSave}>Salva Avatar</button>
          <button onClick={() => setAvatar(null)}>Cancella Avatar</button>
          </div>
          </div>
      ): (
        <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Trascina un'immagine qui o fai clic per selezionarla</p>
          </div>
        )}
      </Dropzone>
      )}
    </div>
  );
};

const dropzoneStyle = {
  width: '396px',
  height: '517px',
  border: '2px dashed #ccc',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

export default AvatarUploader;
