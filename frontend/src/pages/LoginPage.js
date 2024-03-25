import React from "react";
import LoginForm from "../components/LoginForm";
import CharacterBackground from "../components/CharacterBackground";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page page-wrapper">
      <CharacterBackground />
      <div className="login-page-form page-content">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;


 