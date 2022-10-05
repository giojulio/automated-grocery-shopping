import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedPage from "../pages/Feed/FeedPage";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import OrderPage from "../pages/Order/OrderPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ShoppingListPage from "../pages/ShoppingList/ShoppingListPage";
import UserPage from "../pages/User/UserPage";


export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />

                <Route path="/login" element={<LoginPage/>} /> 

                <Route path="/register" element={<RegisterPage/>} /> 

                <Route path="/feed" element={<FeedPage/>} /> 

                <Route path="/order" element={<OrderPage/>} /> 

                <Route path="/shoppinglist" element={<ShoppingListPage/>} />

                <Route path="/user" element={<UserPage/>} /> 
                
                <Route path="*" element={<ErrorPage />} /> 
            </Routes>
        </BrowserRouter>
    );
};