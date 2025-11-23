import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  
  const navigate = useNavigate();

  return (
    <>
      <div className='auth-card'>
        <h2>Welcome  To  ConnectIn 👋</h2>
        <p>Sign in to continue</p>
        <GoogleLogin onSuccess={(credentialResponse) => {
            navigate('/landing');
        }} onError={() => console.error("Login Failed!!")}
        size="large"
        shape="rectangular"
        text="continue_with"
        />
      </div>
    </>
  )
}