import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Auth({ mode }) {
  const isRegister = mode === "register";
  const { login, register, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      if (isRegister) await register(name.trim(), email.trim(), password);
      else await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to complete your request. Please try again.");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-heading">
        <Link to="/login" className="brand auth-brand" aria-label="BookFlix sign in">
          <span className="brand-icon"><BookOpen size={21} /></span>
          <span>Book<span className="brand-accent">Flix</span></span>
        </Link>
        <div className="auth-kicker">YOUR PERSONAL READING SPACE</div>
        <h1 id="auth-heading">{isRegister ? "Create your account" : "Welcome back"}</h1>
        <p className="muted">{isRegister ? "Join BookFlix and make every reading moment count." : "Sign in to continue your reading journey."}</p>
        <form onSubmit={submit}>
          {isRegister && <label>Full name<input autoComplete="name" value={name} onChange={e => setName(e.target.value)} required maxLength={80} placeholder="Enter your full name" /></label>}
          <label>Email address<input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" /></label>
          <label>Password
            <span className="password-field">
              <input type={showPassword ? "text" : "password"} autoComplete={isRegister ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="At least 6 characters" />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
            </span>
          </label>
          {error && <div className="error" role="alert">{error}</div>}
          <button className="primary-button full auth-submit" type="submit" disabled={loading}>{loading ? "Please wait…" : isRegister ? "Create account" : "Sign in"}</button>
        </form>
        <p className="auth-switch">{isRegister ? "Already have an account?" : "New to BookFlix?"} <Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p>
      </section>
    </main>
  );
}
