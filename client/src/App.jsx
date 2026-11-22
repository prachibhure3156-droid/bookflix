import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Reader from "./pages/Reader";
import Flashcards from "./pages/Flashcards";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import HobbyTracker from "./pages/HobbyTracker";
import WordSearch from "./pages/WordSearch";
import WordGames from "./pages/WordGames";

function PrivateLayout(){return <ProtectedRoute><Layout/></ProtectedRoute>;}
export default function App(){return <ThemeProvider><Routes>
  <Route path="/login" element={<Auth mode="login"/>}/><Route path="/signin" element={<Navigate to="/login" replace/>}/><Route path="/register" element={<Auth mode="register"/>}/><Route path="/signup" element={<Navigate to="/register" replace/>}/>
  <Route element={<PrivateLayout/>}>
    <Route path="/" element={<Home/>}/><Route path="/search" element={<Search/>}/><Route path="/library" element={<Library/>}/>
    <Route path="/reader" element={<Reader/>}/><Route path="/flashcards" element={<Flashcards/>}/><Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/progress" element={<Progress/>}/><Route path="/profile" element={<Profile/>}/><Route path="/hobby-tracker" element={<HobbyTracker/>}/><Route path="/word-search" element={<WordSearch/>}/><Route path="/word-games" element={<WordGames/>}/>
  </Route><Route path="*" element={<Navigate to="/" replace/>}/>
</Routes></ThemeProvider>;}
