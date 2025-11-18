import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  return (
    <>
        <GoogleLogin onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            console.log(jwtDecode(credentialResponse.credential));
            navigate('/landing');
        }} onError={() => console.error("Login Failed!!")}/>
    </>
  )
}

export default Login