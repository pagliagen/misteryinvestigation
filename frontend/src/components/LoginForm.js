import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/users";
import { useGlobalState } from "../context/GlobalStateContext";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { sessionInfo, sendSocketMessage } = useGlobalState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/characters/list");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      localStorage.setItem("token", response.token);
      sendSocketMessage("LOGIN_USER", { username });
      sessionInfo.fetchUser();
      navigate("/characters/list");
    } catch (error) {
      const errJson = JSON.parse(error.message);
      setError(errJson.error);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
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
        <div className="login-form_buttons">
          <button type="submit">Login</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="login-form_buttons">
          <Link to="/forgot-password">Recupera password</Link>
          <Link to="/new-user">Crea Utente</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
