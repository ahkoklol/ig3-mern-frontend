import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';

type LoginResponse = {
  email: string;
  token: string;
};

type ErrorResponse = {
  error: string;
};

type ErrorState = ErrorResponse | null;

export const useLogin = () => {
  const [error, setError] = useState<ErrorState>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Make a POST request to your backend for user signup
      const response: AxiosResponse<LoginResponse> = await axios.post(
        'http://localhost:5000/api/user/login',
        { email, password }
      );

      // Handle the response
      if (response.status === 200) {
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(response.data));

        // Update the user in the context
        dispatch({ type: 'LOGIN', payload: response.data });

        // Show a success message using react-toastify
        toast.success('Welcome back!'); // add user name and surname to the message
      }
      setIsLoading(false); // Set isLoading to false here

    } catch (error) {
      // Handle errors
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const responseError = axiosError.response.data as ErrorResponse;
        setError(responseError); // Set the error here
        
        // Show an error message using react-toastify
        toast.error(responseError.error); // You can customize this message
      }
      setIsLoading(false); // Set isLoading to false here
    }
  };

  return { error, isLoading, login };
};