import { useAuthContext } from "./useAuthContext";
import { toast } from 'react-toastify';

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // Remove the user from local storage
        localStorage.removeItem('user');

        // Update the user in the context
        dispatch({ type: 'LOGOUT' });
        toast.success('Goodbye!'); // add user name and surname to the message
    }

    return { logout }
}