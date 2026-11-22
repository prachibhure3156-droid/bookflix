import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Trash2 } from "lucide-react";
import { api } from "../api";
export default function Flashcards(){
 const [words,setWords]=useState([]);const [index,setIndex]=useState(0);const [show,setShow]=useState(false);
 async function load(){try{setWords(await api("/words"));}catch{}}
 useEffect(()=>{load();},[]);
 const current=words[index];
 async function remove(){await api(`/words/${current.id}`,{method:"DELETE"});setShow(false);load();setIndex(0);}
 return <div><div className="page-title"><div className="eyebrow">LEARN A LITTLE EVERY DAY</div><h1>Vocabulary flashcards</h1><p className="muted">Review the words you have collected while reading.</p></div>{!current?<div className="empty-state"><RotateCcw size={36}/><h3>No flashcards yet</h3><p>Save words from the Word Assistant while reading to build your deck.</p></div>:<div className="flashcard-wrap"><div className="flashcard-count">CARD {index+1} OF {words.length}</div><button className={"flashcard "+(show?"revealed":"")} onClick={()=>setShow(v=>!v)}><span className="difficulty">{current.difficulty}</span><h2>{show?current.definition:current.word}</h2><p>{show?`Synonyms: ${current.synonyms?.join(", ")||"—"}`:"Tap to reveal meaning"}</p></button><div className="flashcard-controls"><button className="icon-button danger" onClick={remove}><Trash2 size={17}/></button><button className="secondary-button" onClick={()=>setShow(v=>!v)}><RotateCcw size={16}/> Flip card</button><button className="primary-button" onClick={()=>{setIndex((index+1)%words.length);setShow(false);}}><ArrowRight size={16}/> Next</button></div></div>}</div>;
}
