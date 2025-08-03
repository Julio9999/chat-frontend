import { BrowserRouter, Route, Routes } from "react-router"
import App from "./App"
import { LoginPage } from "./modules/login/pages/login-page"
import ChatPage from "./modules/chat/pages/chat-page";

export const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/chat" element={<ChatPage/>} />
            </Routes>
        </BrowserRouter>
    )
}