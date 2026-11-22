import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, House, Library, LayoutDashboard, Search, Layers, ChartNoAxesColumn, LogOut, CalendarDays, BookA, Brain, Sun, Moon, UserRound, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const links = [
  ["/", "Home", House], ["/library", "My Library", Library], ["/dashboard", "Dashboard", LayoutDashboard],
  ["/search", "Discover", Search], ["/word-search", "Word Search", BookA], ["/word-games", "Word Games", Brain], ["/hobby-tracker", "Hobby Tracker", CalendarDays], ["/flashcards", "Flashcards", Layers], ["/progress", "Reading History", ChartNoAxesColumn]
];

export default function Layout() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  function signOut() { logout(); setMenuOpen(false); navigate("/login", { replace: true }); }
  function closeMenu() { setMenuOpen(false); }

  return <div className="app-shell">
    {menuOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={closeMenu} />}
    <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-heading">
        <div className="brand"><span className="brand-icon"><BookOpen size={21}/></span><span>Book<span className="brand-accent">Flix</span></span></div>
        <button className="sidebar-close" onClick={closeMenu} aria-label="Close menu"><X size={20}/></button>
      </div>
      <div className="side-label">MENU</div>
      <nav>{links.map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === "/"} onClick={closeMenu} className={({isActive}) => "nav-link" + (isActive ? " active" : "")}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom">
        <div className="side-label">YOUR SPACE</div>
        <NavLink to="/profile" onClick={closeMenu} className={({isActive}) => "nav-link" + (isActive ? " active" : "")}><UserRound size={18}/><span>Profile</span></NavLink>
        <button className="nav-link plain" onClick={toggle}>{dark ? <Sun size={18}/> : <Moon size={18}/>}<span>{dark ? "Light mode" : "Dark mode"}</span></button>
        <button className="nav-link plain" onClick={signOut}><LogOut size={18}/><span>Log out</span></button>
        <div className="user-mini"><div className="avatar">{user?.name?.[0]?.toUpperCase() || "R"}</div><div><b>{user?.name || "Reader"}</b><small>BookFlix reader</small></div></div>
      </div>
    </aside>
    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={21}/></button>
        <div className="mobile-brand"><BookOpen size={20}/> BookFlix</div>
        <div className="topbar-right"><span className="welcome">Welcome back, {user?.name?.split(" ")[0] || "Reader"}</span><div className="avatar small">{user?.name?.[0]?.toUpperCase() || "R"}</div></div>
      </header>
      <div className="page-content"><Outlet/></div>
    </main>
  </div>;
}
