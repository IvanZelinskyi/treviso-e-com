import { useNavigate } from "react-router-dom";

const LogoutConfirmation = ({ setLogoutWindow, logout }) => {
  let navigate = useNavigate();
  return (
    <div className="overlay fadeIn">
      <div className="confirmation-container">
        <h1>You want to logout ?</h1>
        <div>
          <button
            onClick={() => {
              logout();
              setLogoutWindow(false);
              navigate("/");
            }}
          >
            Yes
          </button>
          <button onClick={() => setLogoutWindow(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
