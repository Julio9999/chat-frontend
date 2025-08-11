"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useMainStore } from "@/stores/main-store";
import { AuthService } from '../../modules/auth/services/auth-service';

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
    <nav className="flex items-center justify-between p-4 shadow-md bg-white text-gray-900">
      <div className="text-xl font-semibold">
        <Link to={"/"} >
          Chat App
        </Link>
      </div>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 focus:outline-none text-gray-900 cursor-pointer">
            <span className="text-sm font-medium">{userData.username}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 bg-gray-300  text-gray-900 border-none shadow-lg">
          {/* <DropdownMenuItem className="cursor-pointer" onClick={() => alert("Ir al perfil")}>
            Perfil
          </DropdownMenuItem> */}
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleLogout()}>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
