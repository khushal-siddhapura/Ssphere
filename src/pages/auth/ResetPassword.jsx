import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#333",
    fontSize: "22px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    background: "#28a745",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  message: {
    marginTop: "15px",
    color: "#dc3545",
    fontSize: "14px",
  },
};

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/reset-password/${token}`, { newPassword });

      setMessage(response.data.message || "✅ Password successfully reset.");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      console.error("❌ Error resetting password:", err.response?.data?.message || err.message);
      setMessage(err.response?.data?.message || "❌ Error resetting password.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Reset Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Reset Password</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
