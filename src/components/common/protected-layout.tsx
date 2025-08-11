import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthService } from "../../modules/auth/services/auth-service";
import { useMainStore } from "@/stores/main-store";
import { Navbar } from "./navbar";
import { wsClient } from "@/lib/ws-client";
export const ProtectedLayout = () => {
    
    const navigate = useNavigate();

    const setUserData = useMainStore(store => store.setUserData);

    useEffect(() => {
        AuthService.validateToken().then(response => {
            setUserData(response.data.data);
        }).catch(() => {
            navigate('/login')
        })
    }, [])

    useEffect(() => {
        wsClient.connect(import.meta.env.VITE_WSS_URL);
    }, [])

    return (
        <div className="flex flex-col gap-4 h-screen custom-background">
            <Navbar />
            <Outlet />
        </div>
    );
}