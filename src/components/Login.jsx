import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Login.css';

export default function Login() {
  
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    try {

      const decoded = jwtDecode(credentialResponse.credential);

      const res = await axios.post("http://localhost:5000/auth/google", decoded);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/landing");

    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  return (
    <>
      <div className='auth-card'>
        <h2>Welcome  To  ConnectIn 👋</h2>
        <p>Sign in to continue</p>
        <GoogleLogin onSuccess={handleLogin} onError={() => console.error("Login Failed!!")}
        size="large"
        shape="rectangular"
        text="continue_with"
        />
      </div>
    </>
  )
}