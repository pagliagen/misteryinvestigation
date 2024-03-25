// App.js
import './App.css';

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AudioManagementPage from './pages/AudioManagementPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegistrationPage from './pages/RegistrationPage';
import ResetPasswordPage from './pages/ResetPasswordPage'; 
import CharactersConteinerPage from './pages/CharactersConteinerPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import { useGlobalState } from './context/GlobalStateContext';
import { getAudioList } from './services/audios';

function App() {
  const { listAudios, setListAudios } = useGlobalState();

  useEffect(() => {
    if (listAudios === null) {
      getAudioList().then((data) => {
        setListAudios( data);
      })
    }
  }, [listAudios, setListAudios])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-user" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />  
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />  
        <Route path="/characters/*" element={<CharactersConteinerPage />} />
        <Route path="/audio" element={<AudioManagementPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;