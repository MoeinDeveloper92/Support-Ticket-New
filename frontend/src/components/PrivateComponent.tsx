import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from '../shared/Spinner';
const PrivateComponent = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner loading={checkingStatus} />;
  }
  return loggedIn ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateComponent;
