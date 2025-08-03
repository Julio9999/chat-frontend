"use client";

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useMainStore } from "@/stores/main-store";
import { AuthService } from '../../modules/auth/services/auth-service';
import { useNavigate } from "react-router";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const userData = useMainStore(store => store.userData);
  const clearUserData = useMainStore(store => store.clearUserData);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await AuthService.logout()
    clearUserData();
    navigate("/login")
  }
  

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-zinc-900 text-white">
      <div className="text-xl font-semibold">Chat App</div>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 focus:outline-none text-white">
            <span className="text-sm font-medium">{userData.username}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 bg-zinc-800 text-white border-none shadow-lg">
          <DropdownMenuItem onClick={() => alert("Ir al perfil")}>
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLogout()}>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
