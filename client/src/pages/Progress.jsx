import React, { useEffect, useState } from "react";
import { CalendarDays, History } from "lucide-react";
import { api } from "../api";
export default function Progress(){
 const [history,setHistory]=useState([]);const [books,setBooks]=useState([]);
 useEffect(()=>{api("/books/history").then(setHistory).catch(()=>{});api("/books/library").then(setBooks).catch(()=>{});},[]);
 return <div><div className="page-title"><div className="eyebrow">EVERY PAGE COUNTS</div><h1>Reading history & progress</h1><p className="muted">Look back at your reading activity and see how far you have come.</p></div><div className="content-panel"><div className="section-heading"><h2><History size={19}/> Recent reading sessions</h2></div>{history.length?history.map(h=><div className="history-row"><span className="history-dot"/><div><b>{h.title}</b><small>{new Date(h.created_at+"Z").toLocaleString()}</small></div><span className="status-chip">Progress updated</span></div>):<div className="empty-inline"><CalendarDays/><p>No sessions recorded yet. Open a book and update your reading progress.</p></div>}</div><div className="content-panel spaced"><h2>Book completion</h2>{books.length?books.map(b=><div className="progress-book"><div><b>{b.title}</b><small>{b.status}</small></div><div className="progress-track"><span style={{width:`${b.progress}%`}}/></div><b>{b.progress}%</b></div>):<p className="muted">Add books to your library to track your progress.</p>}</div></div>;
}
