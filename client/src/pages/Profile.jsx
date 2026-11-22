import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, UserRound, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return <div>
    <div className="page-title"><div className="eyebrow">YOUR BOOKFLIX ACCOUNT</div><h1>Profile</h1><p className="muted">Manage your reader account and sign-in details.</p></div>
    <section className="content-panel profile-card profile-card-updated">
      <div className="profile-avatar">{user?.name?.[0]?.toUpperCase() || "R"}</div>
      <div className="profile-details"><h2>{user?.name || "BookFlix Reader"}</h2><p className="muted">{user?.email}</p><span className="status-chip"><ShieldCheck size={13} /> BookFlix reader</span></div>
      <UserRound className="profile-symbol" size={28} />
    </section>
    <section className="content-panel account-actions">
      <div><h2>Account access</h2><p className="muted">Sign out safely. You can sign in again anytime using your registered email and password.</p></div>
      <button type="button" className="logout-profile-button" onClick={handleLogout}><LogOut size={17} /> Log out</button>
    </section>
  </div>;
}
