import apiClient from "@/lib/api-client";
import type { ValidateTokenResponse } from "../interfaces/auth-interface";

const login = (username: string, password: string) => {
    const url = "/auth/login";
    return apiClient.post(url, {username, password})
}

const logout = () => {
    const url = "/auth/logout";
    return apiClient.get(url);
}

const validateToken = () => {
    const url = "/auth/validate-token";     
    return apiClient.get<ValidateTokenResponse>(url);
}
export const AuthService = {
    login,
    logout,
    validateToken
}