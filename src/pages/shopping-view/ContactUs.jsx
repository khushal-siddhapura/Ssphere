import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    header: {
      backgroundColor: "#2d87f0",
      color: "white",
      padding: "40px 20px",
      borderRadius: "10px 10px 0 0",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "18px",
      marginTop: "10px",
    },
    contactDetails: {
      marginTop: "40px",
    },
    sectionTitle: {
      fontSize: "28px",
      marginTop: "40px",
      color: "#333",
    },
    contactIcons: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "20px",
    },
    contactItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "30%",
      textAlign: "center",
    },
    contactText: {
      fontSize: "18px",
      color: "#555",
      marginTop: "10px",
    },
    formContainer: {
      marginTop: "40px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "18px",
      color: "#333",
      marginBottom: "8px",
    },
    input: {
      padding: "12px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      boxSizing: "border-box",
    },
    textarea: {
      padding: "12px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      boxSizing: "border-box",
      height: "150px",
    },
    submitButton: {
      padding: "15px",
      fontSize: "18px",
      color: "#fff",
      backgroundColor: "#2d87f0",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "20px",
    },
    footer: {
      marginTop: "30px",
      fontSize: "18px",
      fontWeight: "bold",
      color: "#222",
    },
  };

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    // Handle form submission (e.g., sending the data to the backend)
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Have questions? We'd love to hear from you. Get in touch with our team, and we'll
          get back to you as soon as possible!
        </p>
      </div>

      <div style={styles.contactDetails}>
        <h2 style={styles.sectionTitle}>Contact Information</h2>
        <div style={styles.contactIcons}>
          <div style={styles.contactItem}>
            <FaPhoneAlt size={30} color="#4caf50" />
            <p style={styles.contactText}>Phone: (+91) 81607 16356</p>
          </div>
          <div style={styles.contactItem}>
            <FaEnvelope size={30} color="#f39c12" />
            <p style={styles.contactText}>Email: support@sphere.com</p>
          </div>
          <div style={styles.contactItem}>
            <FaMapMarkerAlt size={30} color="#e74c3c" />
            <p style={styles.contactText}>Address: 159-Hariant Complex, Adajan Surat</p>
          </div>
        </div>
      </div>

      <div style={styles.formContainer}>
        <h2 style={styles.sectionTitle}>Send Us a Message</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              style={styles.input}
              required
              autoComplete="new-email"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              style={styles.textarea}
              required
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>

      <footer style={styles.footer}>
        <p>Thank you for reaching out to <strong>Ssphere</strong>! We'll respond shortly.</p>
      </footer>
    </div>
  );
};


export default ContactUs;
