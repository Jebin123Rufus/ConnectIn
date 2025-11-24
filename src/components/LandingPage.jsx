import { useNavigate } from 'react-router-dom';
function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
        <h1>ConnectIn</h1>
        <button onClick={() => {navigate("/individual")}}>Individual</button>
        <button onClick={() => { navigate("/organisation")}}>Organisation</button>
        <h1>Choose Your Identity !</h1>
    </>
  )
}

export default LandingPage