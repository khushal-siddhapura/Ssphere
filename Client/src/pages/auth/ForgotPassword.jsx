import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoader("load");
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/forgot-password`,
        { email }
      );
      setMessage(
        res.data.message || "✅ Password reset link sent to your email."
      );
      setLoader(null)
      setTimeout(() => {
        navigate("/auth/login");
      }, 4000);
    } catch (err) {
      setMessage("❌ You are not registered user");
      setLoader(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Forgot Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          autoComplete="new-email"
        />
        <button type="submit" style={styles.button}>
          {loader ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
