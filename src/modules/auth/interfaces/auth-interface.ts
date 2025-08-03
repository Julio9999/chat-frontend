export interface ValidateTokenResponse {
    message: string;
    data: UserData;
}

export interface UserData {
    username: string;
    email: string;
}