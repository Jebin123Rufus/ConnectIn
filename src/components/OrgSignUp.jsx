import { useState } from "react";
import axios from "axios";
import "./OrgSignUp.css";

export default function OrganizationForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    mobile: "",
    adminName: "",
    website: "",
    social: {
      instagram: "",
      linkedin: "",
      facebook: "",
    },
    orgType: "",
    logo: null,
  });

    

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailExists, setEmailExists] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [approvalPending, setApprovalPending] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      setFormData({ ...formData, logo: files[0] });
      return;
    }

    if (name.startsWith("social_")) {
      const key = name.split("_")[1];
      setFormData({
        ...formData,
        social: { ...formData.social, [key]: value },
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Check email existence on blur or explicit check
  const checkEmail = async (email) => {
    if (!email) return setEmailExists(null);
    setCheckingEmail(true);
    try {
      const res = await axios.get("http://localhost:5000/auth/exists", { params: { email } });
      setEmailExists(!!res.data?.exists);
      return !!res.data?.exists;
    } catch (err) {
      console.error("Error checking email:", err);
      setEmailExists(null);
      return null;
    } finally {
      setCheckingEmail(false);
    }
  };

  const checkOrgExists = async (email) => {
    if (!email) return null;
    try {
      const res = await axios.get("http://localhost:5000/org/exists", { params: { email } });
      return !!res.data?.exists;
    } catch (err) {
      console.error("Error checking org existence:", err);
      return null;
    }
  };

  const validateSocialLinks = () => {
    return (
      formData.social.instagram ||
      formData.social.linkedin ||
      formData.social.facebook
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // prevent double submits
    setIsSubmitting(true);

    // Ensure email exists in Logins collection
    const email = formData.email;
    const authExists = await checkEmail(email);
    if (authExists !== true) {
      // Not registered in Logins
      alert("Login Properly");
      setIsSubmitting(false);
      return;
    }

    // Ensure email is NOT already registered in Organizations
    const orgExists = await checkOrgExists(email);
    if (orgExists === true) {
      alert("User already exist");
      setIsSubmitting(false);
      return;
    }

    if (!validateSocialLinks()) {
      setError("⚠ At least one social media link is required.");
      setIsSubmitting(false);
      return;
    }

    setError("");

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "social") value = JSON.stringify(value);
      fd.append(key, value);
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/org/register",
        fd,
        { headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true }
      );

      alert("Organization Registered Successfully!");
      console.log(res.data);
      // mark approval pending (server sets access:false by default)
      setApprovalPending(true);
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
      setError("❌ Something went wrong while submitting.");
      setIsSubmitting(false);
    }
  };

  return (
    <form className="org-form" onSubmit={handleSubmit}>
      <h2>Register Your Organization</h2>

      {error && <p className="error">{error}</p>}

      <input name="email" placeholder="Your Email" type="email" required onChange={handleChange} />

      <input name="name" placeholder="Organization Name" required onChange={handleChange} />

      <textarea name="address" placeholder="Address" required onChange={handleChange} />

      <input name="mobile" placeholder="Mobile Number" type="tel" required onChange={handleChange} />

      <input name="adminName" placeholder="Admin Name" required onChange={handleChange} />

      <input name="website" placeholder="Website (Optional)" onChange={handleChange} />

      <label>Social Media Links (Any one required):</label>
      <input name="social_instagram" placeholder="Instagram" onChange={handleChange} />
      <input name="social_linkedin" placeholder="LinkedIn" onChange={handleChange} />
      <input name="social_facebook" placeholder="Facebook" onChange={handleChange} />

      <select name="orgType" required onChange={handleChange}>
        <option value="">Select Organization Type</option>
        <option value="Educational Institution">Educational Institution</option>
        <option value="Government">Government</option>
        <option value="NGO">NGO</option>
        <option value="Others">Others</option>
      </select>

      <label>Upload Logo</label>
      <input type="file" accept="image/*" name="logo" required onChange={handleChange} />

      <button
        type="submit"
        disabled={isSubmitting || approvalPending}
        style={approvalPending ? { backgroundColor: "#FFD54F", color: "#000" } : {}}
      >
        {approvalPending ? "Approval pending" : isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
