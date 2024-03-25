import React, { useState } from "react";
import { resetPassword } from "../services/users";
import CharacterBackground from "../components/CharacterBackground";
import './ForgotPasswordPage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage(
        "Un'email con le istruzioni per il reset della password è stata inviata."
      );
    } catch (error) {
      console.error("Errore durante il reset della password:", error);
      setMessage("Si è verificato un errore durante il reset della password.");
    }
  };

  return (
    <div className="forgotpassword-page page-wrapper">
      <CharacterBackground  />
      {message ? (
        <div className="forgotpassword-page-form page-content">
        <p>{message}</p>
        </div>
      ) : (
        <div className="forgotpassword-page-form page-content">
          <form onSubmit={handleResetPassword}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit">Invia Email di Reset</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
