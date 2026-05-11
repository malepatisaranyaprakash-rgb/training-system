import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div style={{
      background: "#333",
      color: "#fff",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h3>🎓 Training System</h3>

      <button onClick={logout} style={{
        background: "red",
        color: "white",
        border: "none",
        padding: "5px 10px"
      }}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;