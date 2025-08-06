import { Route, Routes, HashRouter } from "react-router"
import App from "./App"
import { LoginPage } from "./modules/auth/pages/login-page"
import ChatPage from "./modules/chat/pages/chat-page";
import { ProtectedLayout } from "./components/common/protected-layout";

export const MainRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />



                <Route element={<ProtectedLayout />}> 
                    <Route path="/" element={<App />} />
                    <Route path="/chat" element={<ChatPage />} />
                </Route>


            </Routes>
        </HashRouter>
    )
}