import { useLocation } from "react-router-dom";

export const BaseUrl = import.meta.env.VITE_API_URL;

export const useCurrentUrl = () => {
    const location = useLocation();
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${location.pathname}${location.search}`;

    return fullUrl
}