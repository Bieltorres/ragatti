import Cookies from 'js-cookie';
export const token = Cookies.get('token');
export const apiUrl = import.meta.env.VITE_API_URL;