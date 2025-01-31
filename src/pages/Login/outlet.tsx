import { useNavigate } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import { AppContext } from '../../state'; // Adjust the path accordingly

interface ProtectedRouteProps {
    children: ReactNode;
  }

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { state } = useContext(AppContext); // Assuming you have an isAuthenticated field in your state to check
  const navigate = useNavigate();

  const storedString = localStorage.getItem('isLogged');


  
    if (storedString !== 'true') {
      navigate("/");
      return null;
    }

  // If user is not authenticated, redirect to the login page


  // If user is authenticated, render the passed children
  return <>{children}</>;
}