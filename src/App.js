import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ItemList from './pages/ItemList';
import ItemDetails from './pages/ItemDetails';
import './App.css';
import UserLogin from './component/UserLogin';
import UserRegister from './component/UserRegister';
import Header from './header/Header';
import PrivateRoute from './component/PrivateRoute';
import { useSelector } from 'react-redux';
import AboutUs from './pages/AboutUs';
import Footer from './footer/Footer';

function App() {

  const { user } = useSelector((state) => state.user);
  // console.log(user);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/aboutus" element={<AboutUs />} />
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<ItemList />} />
        <Route
          path="/item"
          element={
            user ? <ItemDetails /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
