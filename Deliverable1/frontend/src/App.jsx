//u23559129 Rachel Kambala
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Splash from "./pages/Splash.jsx";
import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import Exhibits from "./pages/Exhibits.jsx";
import Collections from "./pages/Collections.jsx";
import Studio from "./pages/Studio.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PostPage from "./pages/PostPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/discover" element={<Discover />}/>
                <Route path="/exhibits" element={<Exhibits />}/>
                <Route path="/collections" element={<Collections />}/>
                <Route path="/studio" element={<Studio />}/>
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/post/:id" element={<PostPage />}/>
                <Route path="/profile" element={<Studio />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;