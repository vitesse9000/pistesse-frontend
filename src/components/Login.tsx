import LoginBtn from './LoginBtn';

const Login = () => {
  return (
    <>
      <div className="row g-0 text-center">
        <p>To upload directly to <span className="fw-bolder">Strava</span>:</p>
      </div>
      <div className="row g-0">
        <LoginBtn />
      </div>
    </>
  );
};

export default Login;
