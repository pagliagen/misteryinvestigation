import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import CharacterBackground from "../components/CharacterBackground";
import "./RegistrationPage.css";

function RegistrationPage() {
  return (
    <div className="registration-page page-wrapper">
      <CharacterBackground backToList />
      <div className="registration-page-form page-content">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
