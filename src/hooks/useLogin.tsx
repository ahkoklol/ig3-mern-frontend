import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

type LoginResponse = {
  _id: string;
  email: string;
  token: string;
  role: string;
};

type ErrorResponse = {
  error: string;
};

type ErrorState = ErrorResponse | null;

export const useLogin = () => {
  const [error, setError] = useState<ErrorState>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);  // Add success state
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false); // Reset success on a new signup attempt

    try {
      // Make a POST request to your backend for user login
      const response: AxiosResponse<LoginResponse> = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password }
      );

      // Handle the response
      if (response.status === 200) {
        // Save the user to local storage
        // console.log('User data from server:', response.data); // ok
        // Extract the user data from the response
        const { email, token, _id, role } = response.data;

        // Save the user to local storage
        // Ensure you only save the necessary user details
        localStorage.setItem('user', JSON.stringify({ email, token, _id, role }));

        // Update the user in the context
        // Create a user object that matches your User interface
        const user = { email, _id, role };
        dispatch({ type: 'LOGIN', payload: user });

        // Show a success message using react-toastify
        toast.success('Welcome back!'); // add user name and surname to the message
        setSuccess(true); // Set success to true on successful signup
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
    }
    finally {
      setIsLoading(false); // Ensure isLoading is set in finally block
    }
  };

  return { error, isLoading, login, success };
};