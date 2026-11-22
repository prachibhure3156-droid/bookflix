import React,{useEffect,useMemo,useState} from "react";
import {CalendarDays,ChevronLeft,ChevronRight,CheckCircle2} from "lucide-react";
import {api} from "../api";
const monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
export default function HobbyTracker(){
 const [year,setYear]=useState(new Date().getFullYear()),[days,setDays]=useState([]),[hobby,setHobby]=useState("Reading"),[note,setNote]=useState(""),[selected,setSelected]=useState("");
 async function load(){try{setDays(await api("/tracker/hobbies"));}catch(e){console.error(e);}}
 useEffect(()=>{load();},[]);
 const marked=useMemo(()=>new Map(days.map(d=>[d.day,d])),[days]);
 async function toggle(date){
  const key=`${year}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  setSelected(key);
  if(marked.has(key)){await api(`/tracker/hobbies/${key}`,{method:"DELETE"});setDays(v=>v.filter(x=>x.day!==key));}
  else {const item={day:key,hobby,note};await api("/tracker/hobbies",{method:"POST",body:JSON.stringify(item)});setDays(v=>[...v,item]);}
 }
 return <div><div className="page-title"><div className="eyebrow">SMALL STEPS, EVERY DAY</div><h1>Hobby tracker</h1><p className="muted">Mark the days you spend time on a hobby. Your calendar is saved to your account.</p></div>
 <section className="content-panel hobby-panel"><div className="section-heading"><div><h2><CalendarDays size={20}/> {year} Hobby Tracker</h2><small className="muted">Tap a date to mark or unmark your activity</small></div><div className="year-controls"><button className="icon-button" onClick={()=>setYear(y=>y-1)}><ChevronLeft/></button><b>{year}</b><button className="icon-button" onClick={()=>setYear(y=>y+1)}><ChevronRight/></button></div></div>
 <div className="hobby-tools"><label>Hobby<select value={hobby} onChange={e=>setHobby(e.target.value)}>{["Reading","Writing","Drawing","Music","Exercise","Learning","Other"].map(x=><option>{x}</option>)}</select></label><label>Note (optional)<input value={note} onChange={e=>setNote(e.target.value)} placeholder="What did you work on?"/></label></div>
 <div className="year-calendar">{monthNames.map((m,mi)=>{const first=new Date(year,mi,1).getDay(),count=new Date(year,mi+1,0).getDate();return <div className="month-card" key={m}><h3>{m}</h3><div className="month-grid">{["S","M","T","W","T","F","S"].map((d,i)=><b key={i}>{d}</b>)}{Array.from({length:first},(_,i)=><span key={"blank"+i}/>)}{Array.from({length:count},(_,i)=>{const n=i+1,key=`${year}-${String(mi+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`;return <button key={key} title={marked.get(key)?.hobby||`Mark ${key}`} className={marked.has(key)?"marked":""} onClick={()=>toggle(new Date(year,mi,n))}>{n}</button>})}</div></div>})}</div>
 <div className="calendar-legend"><span className="legend-dot"/> Activity completed <span className="muted">{days.filter(d=>d.day.startsWith(String(year))).length} marked days in {year}</span></div>
 </section></div>;
}
