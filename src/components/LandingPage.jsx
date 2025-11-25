import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { CgOrganisation } from "react-icons/cg";
import './LandingPage.css';
function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
        <h1>ConnectIn</h1>
        <h4> Make Your first move By Choosing Your Role </h4>
        <div className = "buttons">
          <button onClick={() => {navigate("/individual")}}>
            <CgProfile className="identity-icon" /> Individual
          </button>
          <button onClick={() => { navigate("/organisation")}}>
            <CgOrganisation className= "identity-icon" /> 
            Organisation
          </button>
        </div>
        
        <h1>Choose Your Identity !</h1>
    </>
  )
}

export default LandingPage