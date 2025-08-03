"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginService } from '../services/login-service';
import { useNavigate } from "react-router"

export default function Component() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        await LoginService.login(username, password);
        navigate('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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
                        <Button
                            type="submit"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Iniciar Sesión
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
