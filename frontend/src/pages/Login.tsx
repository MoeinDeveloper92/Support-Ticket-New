import { useEffect, useState } from 'react';
import { LoginUserDto } from '../@types/user.dto';
import { FaSignInAlt } from 'react-icons/fa';
import Input from '../shared/Input';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { loginUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../shared/Spinner';
const Login = () => {
  const [formData, setFormData] = useState<LoginUserDto>({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const { isLoading, isError, isSuccess, user, token, message } =
    useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((preData) => ({
      ...preData,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      
      toast.error(message);
    }
    if (isSuccess) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, user, token, navigate, dispatch]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginUserDto: LoginUserDto = {
      email,
      password,
    };
    dispatch(loginUser(loginUserDto));
  };

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and Create an Account!</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <Input
              as="input"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              type="email"
              required={true}
            />
          </div>
          <div className="form-group">
            <Input
              as="input"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              type="password"
              required={true}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
