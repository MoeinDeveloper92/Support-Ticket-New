import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { logoutUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutUser(null));
    navigate('/login');
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to={'/'}>Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </>
        ) : (
          <>
            <li>
              <Link to={'/login'}>
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to={'/register'}>
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
