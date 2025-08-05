export interface ValidateTokenResponse {
    message: string;
    data: UserData;
}

export interface UserData {
    username: string;
    email: string;
    maxAge?: number; // Optional, in case it's not always returned
}