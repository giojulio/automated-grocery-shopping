import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedPage from "../pages/Feed/FeedPage";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ShoppingListPage from "../pages/ShoppingList/ShoppingListPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AboutPage from "../pages/About/AboutPage"
import ErrorPage from "../pages/Error/ErrorPage";


export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />

                <Route path="/login" element={<LoginPage/>} /> 

                <Route path="/register" element={<RegisterPage/>} /> 

                <Route path="/feed" element={<FeedPage/>} /> 

                <Route path="/shopping-list" element={<ShoppingListPage/>} />

                <Route path="/profile" element={<ProfilePage/>} /> 
                
                <Route path="/about" element={<AboutPage />} /> 

                <Route path="/*" element={<ErrorPage />} /> 
            </Routes>
        </BrowserRouter>
    );
};