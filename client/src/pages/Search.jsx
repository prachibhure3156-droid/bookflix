import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { sampleBooks } from "../data";
import { api } from "../api";
export default function Search() {
  const [q,setQ]=useState(""); const [results,setResults]=useState(sampleBooks); const [busy,setBusy]=useState(false); const [message,setMessage]=useState(""); const nav=useNavigate();
  async function search(e) { e?.preventDefault(); if(!q.trim()){setMessage("Enter a title, author or keyword to search.");return;} setBusy(true);setMessage(""); try { const r=await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q.trim())}&limit=24`); if(!r.ok)throw new Error("Book search is temporarily unavailable."); const d=await r.json(); const found=(d.docs||[]).map(b=>({key:b.key,title:b.title,author:b.author_name?.[0]||"Unknown author",cover:b.cover_i?`https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`:"",description:"Book listing provided by Open Library."}));setResults(found);if(!found.length)setMessage("No books found. Try another title or author."); } catch(e) {const local=sampleBooks.filter(b=>(b.title+" "+b.author).toLowerCase().includes(q.toLowerCase()));setResults(local);setMessage(local.length?"Showing matching books available offline.":e.message+" Check your internet connection and try again.");} finally {setBusy(false);} }
  async function save(b) { try { await api("/books/library",{method:"POST",body:JSON.stringify({bookId:b.key,title:b.title,author:b.author,cover:b.cover})}); alert("Added to your library."); } catch(e){alert(e.message);} }
  return <div><div className="page-title"><div className="eyebrow">FIND YOUR NEXT FAVOURITE</div><h1>Discover books</h1><p className="muted">Search thousands of book listings and add a new read to your library.</p></div><form className="search-bar" onSubmit={search}><SearchIcon size={20}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title, author or keyword…"/><button className="primary-button">{busy?"Searching…":"Search"}</button></form>{message&&<p className="inline-message">{message}</p>}<div className="book-grid search-grid">{results.map((b,i)=><BookCard key={b.key||i} book={b} onSave={save} onRead={()=>nav("/reader",{state:{book:b}})}/>)}</div></div>;
}
