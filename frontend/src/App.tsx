import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import PrivateComponent from './components/PrivateComponent';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-ticket" element={<PrivateComponent />}>
          <Route path="/new-ticket" element={<NewTicket />} />
        </Route>

        <Route path="/tickets" element={<PrivateComponent />}>
          <Route path="/tickets" element={<Tickets />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
