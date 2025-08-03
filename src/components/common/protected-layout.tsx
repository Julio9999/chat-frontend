import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthService } from "../../modules/auth/services/auth-service";
import { useMainStore } from "@/stores/main-store";
import { Navbar } from "./navbar";
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

    return (
        <div className="flex flex-col gap-4 bg-zinc-900 h-screen">
            <Navbar />
            <Outlet />
        </div>
    );
}