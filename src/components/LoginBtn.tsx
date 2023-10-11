import { useNavigate } from 'react-router';

const LoginBtn = () => {
  const navigate = useNavigate();

  return (
      <button
        type="button"
        className="btn btn-strava text-light w-100 text-center"
        onClick={() => navigate('/login/strava')}
      >
        <i className="bi-strava me-2" />
        Login
      </button>
  );
};

export default LoginBtn;
