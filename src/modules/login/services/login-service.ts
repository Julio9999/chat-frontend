import apiClient from "@/lib/api-client";

const login = (username: string, password: string) => {

    const url = "/auth/login";

    return apiClient.post(url, {username, password})
}

export const LoginService = {
    login
}