import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const styles = {
  container: {
    maxWidth: "800px", 
    margin: "40px auto",
    padding: "40px", 
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "30px",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  submitButton: {
    backgroundColor: "#2563eb", 
    color: "#fff",
    padding: "12px 24px",
    fontSize: "18px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  submitButtonHover: {
    backgroundColor: "#1e40af", 
  },
  message: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#d9534f",
  },
};

const ComplaintPanel = () => {
  const {id} = useParams();
  const [orderId, setOrderId] = useState(id);
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [defectImage, setDefectImage] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const storedEmail = localStorage.getItem("userEmail"); 

  if (storedEmail && !userEmail) {
    setUserEmail(storedEmail);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDefectImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/complaints`,
        {
          orderId,
          complaintType,
          description,
          defectImage,
          userEmail,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      toast({
        title: "Complaint submitted successfully!",
        variant: "success",
      });
      navigate("/shop/home");
    } catch (error) {
      setMessage(error.response?.data?.message);
    }
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Submit a Complaint</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Order ID:</label>
          <input
            type="text"
            value={id}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Complaint Type:</label>
          <select
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select a type</option>
            <option value="Damaged Product">Damaged Product</option>
            <option value="Late Delivery">Late Delivery</option>
            <option value="Wrong Item">Wrong Item Received</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Complaint Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Defective Product Image (Optional):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Your Email:</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            style={styles.input}
            required
            autoComplete="new-email"
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          {isLoading ? "Submiting...." : "Submit Complaint"}
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default ComplaintPanel;
