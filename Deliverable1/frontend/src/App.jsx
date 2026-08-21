//u23559129 Rachel Kambala
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Splash from "./components/Splash";
import Home from "./components/Home";
import Discover from "./components/Discover";
import Exhibits from "./components/Exhibits";
import Collections from "./components/Collections";
import Studio from "./components/Studio";
import ProfilePage from "./components/ProfilePage";
import PostPage from "./components/PostPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route element={<Header />}>
                <Route path="/home" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/exhibits" element={<Exhibits />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/studio" element={<Studio />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/post/:postId" element={<PostPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}