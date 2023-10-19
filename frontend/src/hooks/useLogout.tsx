import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // Remove the user from local storage
        localStorage.removeItem('user');

        // Update the user in the context
        dispatch({ type: 'LOGOUT' });
    }

    return { logout }
}