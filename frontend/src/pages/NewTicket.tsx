import { useEffect, useState } from 'react';
import { Product } from '../@types/ticket.dto';
import Input from '../shared/Input';
import { useAppSelector, useAppDispatch } from '../app/hook';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import { CreateTicketDto } from '../@types/ticket.dto';
import Spinner from '../shared/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BackButton from '../shared/BackButton';
const NewTicket = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.ticket
  );
  const [name] = useState<string>(user?.name as string);
  const [email] = useState<string>(user?.email as string);
  const [product, setProduct] = useState<Product>(Product.IPHONE);
  const [description, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate('/tickets');
      dispatch(reset());
    }
    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: CreateTicketDto = {
      product,
      description,
    };

    dispatch(createTicket(newTicket));
  };

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }
  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please Fill Out The Form Below!</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <Input className="form-control" type="text" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <Input className="form-control" type="email" value={email} disabled />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product"> Products</label>
            <Input
              as="select"
              id="product"
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value as Product)}
            >
              <option value={'iPhone'}>iPhone</option>
              <option value={'iPad'}>iPad</option>
              <option value={'iPod'}>iPod</option>
              <option value={'iMac'}>iMac</option>
              <option value={'Macbook Pro'}>Macbook pro</option>
            </Input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of Issue</label>
            <Input
              as="textarea"
              name="description"
              id="description"
              value={description}
              className="form-control"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
