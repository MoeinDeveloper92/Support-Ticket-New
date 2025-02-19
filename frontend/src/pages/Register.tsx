import { useState, useEffect } from 'react';
import { CreateUserDto, RegisterUserInServer } from '../@types/user.dto';
import { FaUser } from 'react-icons/fa';
import Input from '../shared/Input';
import { toast } from 'react-toastify';
import { registerUser, reset } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { useNavigate } from 'react-router-dom';
import Spinner from '../shared/Spinner';
const Register = () => {
  const [formData, setFormData] = useState<CreateUserDto>({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const { isError, isLoading, isSuccess, message, user, token } =
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

    //if it is successfull we want to redirect
    if (isSuccess || token || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, navigate, token, user]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2 || password.length === 0) {
      toast.error('Passwords do not match!');
      return;
    }

    const newUser: RegisterUserInServer = {
      name,
      email,
      password,
    };

    dispatch(registerUser(newUser));
  };

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please Create An Account!</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <Input
              as="input"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              type="text"
              required={true}
            />
          </div>
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
            <Input
              as="input"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={handleChange}
              placeholder="Password Confirmation"
              type="password"
              required={true}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
