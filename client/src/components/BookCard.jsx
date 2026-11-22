import React from "react";
import { BookmarkPlus, BookOpen, Star } from "lucide-react";
export default function BookCard({ book, onSave, onRead, saved = false }) {
  return <article className="book-card">
    <button className="cover-button" onClick={() => onRead(book)} aria-label={`Read ${book.title}`}><img src={book.cover || "https://placehold.co/300x440/25283a/ffffff?text=Book"} alt={`${book.title} cover`} onError={e => e.currentTarget.src="https://placehold.co/300x440/25283a/ffffff?text=Book"}/></button>
    <div className="book-card-info"><div className="book-title">{book.title}</div><div className="muted small-text">{book.author || "Unknown author"}</div><div className="book-card-actions"><button className="icon-button" title="Open reader" onClick={() => onRead(book)}><BookOpen size={16}/></button><button className={"icon-button " + (saved ? "saved" : "")} title="Save to library" onClick={() => onSave(book)}><BookmarkPlus size={16}/></button><span className="rating"><Star size={13} fill="currentColor"/> 4.8</span></div></div>
  </article>;
}
