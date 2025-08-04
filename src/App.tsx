import { Outlet } from 'react-router-dom';
import Footer from './common/Footer';
import { Header } from './common/Header';
import { useLocation } from "react-router-dom";

function App() {

  const location = useLocation();

  const isLoginOrSignUpPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isLoginOrSignUpPage && <Header />}
      <Outlet />
      {!isLoginOrSignUpPage && <Footer />}
    </>
  )
}

export default App
