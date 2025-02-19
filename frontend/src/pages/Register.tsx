import { useState } from 'react';
import { CreateUserDto } from '../@types/user.dto';
import { FaUser } from 'react-icons/fa';
import Input from '../shared/Input';
import { toast } from 'react-toastify';
const Register = () => {
  const [formData, setFormData] = useState<CreateUserDto>({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((preData) => ({
      ...preData,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2 || password.length === 0) {
      toast.error('Passwords do not match!');
      return;
    }

    alert('Form Submitted!');
  };
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
