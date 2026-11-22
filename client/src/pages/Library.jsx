import React, { useEffect, useState } from "react";
import { BookOpen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
export default function Library() {
 const [books,setBooks]=useState([]); const [filter,setFilter]=useState("All"); const nav=useNavigate();
 async function load(){try{setBooks(await api("/books/library"));}catch(e){}}
 useEffect(()=>{load();},[]);
 async function remove(id){if(!confirm("Remove this book from your library?"))return;await api(`/books/library/${encodeURIComponent(id)}`,{method:"DELETE"});load();}
 const shown=books.filter(b=>filter==="All"||(filter==="Read"?b.status==="Completed":b.status===filter));
 return <div><div className="page-title"><div className="eyebrow">YOUR PERSONAL COLLECTION</div><h1>My Library</h1><p className="muted">Your saved books, currently reading titles and completed reads, together in one place.</p></div><div className="filter-tabs">{["All","Want to Read","Reading","Read"].map(x=><button className={filter===x?"selected":""} onClick={()=>setFilter(x)}>{x}</button>)}</div>{shown.length===0?<div className="empty-state"><BookOpen size={36}/><h3>Your shelf is waiting</h3><p>Discover a book and save it here to get started.</p></div>:<div className="library-list">{shown.map(b=><div className="library-item" key={b.book_id}><img src={b.cover||"https://placehold.co/90x130/25283a/fff?text=Book"} onError={e=>e.currentTarget.src="https://placehold.co/90x130/25283a/fff?text=Book"}/><div className="library-info"><h3>{b.title}</h3><p className="muted">{b.author}</p><span className="status-chip">{b.status}</span><div className="progress-track"><span style={{width:`${b.progress}%`}}/></div><small className="muted">{b.progress}% completed</small></div><div className="library-actions"><button className="secondary-button" onClick={()=>nav("/reader",{state:{book:{key:b.book_id,title:b.title,author:b.author,cover:b.cover}}})}>Continue <BookOpen size={15}/></button><button className="icon-button danger" onClick={()=>remove(b.book_id)}><Trash2 size={16}/></button></div></div>)}</div>}</div>;
}
