import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Flame, Search, Sparkles, CalendarDays, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { sampleBooks } from "../data";
import { api } from "../api";

export default function Home() {
  const [books,setBooks] = useState(sampleBooks); const [library,setLibrary] = useState([]);
  const navigate = useNavigate();
  useEffect(() => { api("/books/library").then(setLibrary).catch(()=>{}); }, []);
  async function save(book) {
    try { await api("/books/library",{method:"POST",body:JSON.stringify({bookId:book.key || book.keyId || book.title,title:book.title,author:book.author,cover:book.cover})}); setLibrary(v=>[...v,{book_id:book.key,title:book.title}]); }
    catch(e) { alert(e.message); }
  }
  async function discover() {
    try { const r=await fetch("https://openlibrary.org/search.json?q=popular+fiction&limit=12"); const d=await r.json(); setBooks(d.docs.slice(0,12).map((b,i)=>({key:b.key,title:b.title,author:b.author_name?.[0]||"Unknown author",cover:b.cover_i?`https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`:"",description:"Discover this title in the Open Library catalogue."}))); } catch {}
  }
  return <div>
    <section className="hero"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR PERSONAL READING SPACE</div><h1>Escape into a<br/><span>good story.</span></h1><p>Discover books, collect new words and make every reading session count.</p><div className="hero-actions"><button className="primary-button" onClick={()=>navigate("/search")}>Explore books <ArrowRight size={17}/></button><button className="secondary-button" onClick={()=>navigate("/library")}>My library</button></div></div><div className="hero-art"><div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div><div className="hero-book"><BookOpen size={78}/><span>READ<br/>MORE</span></div><div className="floating-note note-one">✦ One more chapter</div><div className="floating-note note-two">Your story awaits</div></div></section>
    <div className="stats-row"><div className="stat-card"><span className="stat-icon purple"><BookOpen/></span><div><b>{library.length}</b><small>Books in library</small></div></div><div className="stat-card"><span className="stat-icon orange"><Flame/></span><div><b>Start today</b><small>Build your reading streak</small></div></div><div className="stat-card"><span className="stat-icon blue"><Sparkles/></span><div><b>Word by word</b><small>Grow your vocabulary</small></div></div></div>
    <section className="home-feature-links"><button className="home-feature-card" onClick={()=>navigate("/hobby-tracker")}><CalendarDays size={24}/><span><b>2026 Hobby Tracker</b><small>Open your full-year calendar and mark your daily activities.</small></span><ArrowRight/></button><button className="home-feature-card" onClick={()=>navigate("/word-games")}><Brain size={24}/><span><b>Word-by-word games</b><small>Play GK, vocabulary and author quizzes.</small></span><ArrowRight/></button><button className="home-feature-card" onClick={()=>navigate("/word-search")}><Search size={24}/><span><b>Search for words</b><small>Find meanings, synonyms and antonyms.</small></span><ArrowRight/></button></section>
    <section className="section-block"><div className="section-heading"><div><div className="eyebrow">HANDPICKED FOR YOU</div><h2>Featured reads</h2></div><button className="text-button" onClick={()=>navigate("/search")}>See all <ArrowRight size={15}/></button></div><div className="book-grid">{books.slice(0,6).map(b=><BookCard key={b.key} book={b} onSave={save} onRead={()=>navigate("/reader",{state:{book:b}})} saved={library.some(x=>x.book_id===b.key)}/>)}</div></section>
  </div>;
}
