import { GoogleLogin } from '@react-oauth/google';

function Login() {
  return (
    <>
        <GoogleLogin onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
        }} onError={() => console.error("Login Failed!!")}/>
        <div>
            <h1>Hello World</h1>
            <h2>Login Successful</h2>
        </div>
    </>
  )
}

export default Login