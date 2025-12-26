import React from "react";
import { FaShippingFast, FaShieldAlt, FaRegSmileBeam, FaPhoneAlt } from "react-icons/fa";

const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      textAlign: "center",
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
    sectionTitle: {
      fontSize: "28px",
      marginTop: "40px",
      color: "#333",
    },
    text: {
      fontSize: "18px",
      color: "#555",
      lineHeight: "1.6",
      marginBottom: "20px",
    },
    featuresContainer: {
      marginTop: "30px",
    },
    features: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "20px",
    },
    feature: {
      width: "30%",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    missionContainer: {
      marginTop: "30px",
    },
    storyContainer: {
      marginTop: "40px",
    },
    contactContainer: {
      marginTop: "40px",
      backgroundColor: "#f1f1f1",
      padding: "20px",
      borderRadius: "8px",
    },
    footer: {
      marginTop: "30px",
      fontSize: "18px",
      fontWeight: "bold",
      color: "#222",
    },
  };

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>About Us</h1>
        <p style={styles.subtitle}>
          Welcome to <strong>Ssphere</strong>, the best place for premium products and
          unparalleled shopping experiences. We are passionate about bringing you top-quality
          items at the best prices!
        </p>
      </div>

      <div style={styles.missionContainer}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.text}>
          Our goal is simple: make online shopping easier and more enjoyable for you. With
          fast delivery, exceptional customer service, and a seamless shopping platform, we
          aim to make your shopping experience unforgettable.
        </p>
      </div>

      <div style={styles.featuresContainer}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.features}>
          <div style={styles.feature}>
            <FaShippingFast size={50} color="#2d87f0" />
            <h3>Fast Delivery</h3>
            <p>Efficient logistics for quick shipping right to your doorstep.</p>
          </div>
          <div style={styles.feature}>
            <FaShieldAlt size={50} color="#4caf50" />
            <h3>Secure Shopping</h3>
            <p>We use the latest encryption technology to protect your data.</p>
          </div>
          <div style={styles.feature}>
            <FaRegSmileBeam size={50} color="#f39c12" />
            <h3>Customer Satisfaction</h3>
            <p>Our support team is available 24/7 to assist you with anything you need.</p>
          </div>
        </div>
      </div>

      <div style={styles.storyContainer}>
        <h2 style={styles.sectionTitle}>Our Story</h2>
        <p style={styles.text}>
          Founded in <strong>2022</strong>, <strong>Ssphere</strong> started as a
          small online store and quickly grew into one of the most trusted eCommerce platforms.
          With a focus on quality and customer satisfaction, we continue to strive for excellence
          in everything we do.
        </p>
      </div>

      <div style={styles.contactContainer}>
        <h2 style={styles.sectionTitle}>Contact Us</h2>
        <p style={styles.text}>
          📩 <strong>Email:</strong> support@sphere.com
          <br />
          📍 <strong>Headquarters:</strong> 159-Hariant Complex, Adajan Surat
        </p>
      </div>

      <footer style={styles.footer}>
        <p>Thank you for choosing <strong>Ssphere</strong> – Happy Shopping! 🚀</p>
      </footer>
    </div>
  );
};


export default AboutUs;
