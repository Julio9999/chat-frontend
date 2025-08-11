"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from '../services/auth-service';
import { useNavigate } from "react-router"
import { ButtonPrimary } from "@/components/common/button-primary"

export default function Component() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        await AuthService.login(username, password);
        navigate('/chat')
    }

    return (
        <div className="min-h-screen flex items-center justify-center  custom-background p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold text-gray-900">Iniciar Sesión</CardTitle>
                    <CardDescription className="text-gray-600">Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 mb-4">
                       
                        <div className="flex flex-col gap-4">

                            <div className="flex flex-col gap-2">
                                <Label>Usuario</Label>
                                <Input name="username" value={username} onChange={(e) => setUsername(e.target.value)}  />
                            </div>

                              <div className="flex flex-col gap-2">
                                <Label>Contraseña</Label>
                                <Input name="email" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                        </div>


                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <ButtonPrimary
                            type="submit"
                        >
                            Iniciar Sesión
                        </ButtonPrimary>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
