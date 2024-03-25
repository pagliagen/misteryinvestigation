import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { updatePassword } from "../services/users";
import CharacterBackground from "../components/CharacterBackground";
import './ForgotPasswordPage.css';

function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Effettua una richiesta al backend per reimpostare la password
      await updatePassword(token, newPassword);
      // Imposta lo stato per indicare che la password è stata aggiornata con successo
      setPasswordUpdated(true);
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div className="forgotpassword-page page-wrapper">
      <CharacterBackground  />
      {passwordUpdated ? (
        <div className="forgotpassword-page-form page-content">
          <p>Password updated successfully</p>
          <Link to="/login">Vai a Login</Link>
        </div>
      ) : (
        <div className="forgotpassword-page-form page-content">
          <p>Token: {token}</p>
          <form onSubmit={handleResetPassword}>
            <div>
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            </div>
            <button type="submit">Reset Password</button>
            <div>
            <Link to="/login">Torna a Login</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPasswordPage;
