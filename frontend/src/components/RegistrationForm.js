import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/users";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMaster, setIsMaster] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email,username, password, isMaster);
      navigate("/login");
    } catch (error) {
      const errJson = JSON.parse(error.message);
      setError(errJson.error);
    }
  };

  return (
    <div className="registration-form">
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>
            Master User
          </label>
            <input
              type="checkbox"
              checked={isMaster}
              onChange={(e) => setIsMaster(e.target.checked)}
            />
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <Link to="/forgot-password">Recupera password</Link>
        <Link to="/login">Vai a Login</Link>
      </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
