import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hook';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
  const { token, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token || user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    //we checkd the user is logged In
    setCheckingStatus(false);
  }, [token, user]);

  return { loggedIn, checkingStatus };
};
