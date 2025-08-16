import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthService } from "../../modules/auth/services/auth-service";
import { useMainStore } from "@/stores/main-store";
import { Navbar } from "./navbar";
import { wsClient } from "@/lib/ws-client";
export const ProtectedLayout = () => {
    
    const navigate = useNavigate();

    const setUserData = useMainStore(store => store.setUserData);
    const userData = useMainStore(store => store.userData);

    useEffect(() => {
        AuthService.validateToken().then(response => {
            setUserData(response.data.data);
        }).catch(() => {
            navigate('/login')
        })
    }, [])

    useEffect(() => {
        if(userData.id === 0) return;   
        console.log("Connecting to WebSocket server...");
        wsClient.connect(import.meta.env.VITE_WSS_URL, userData.id);

        return () => {
            console.log("Disconnecting from WebSocket server...");
            wsClient.disconnect();
        }
    }, [userData])

    return (
        <div className="flex flex-col gap-4 h-screen custom-background">
            <Navbar />
            <Outlet />
        </div>
    );
}