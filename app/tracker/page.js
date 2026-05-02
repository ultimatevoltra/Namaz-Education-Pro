'use client';
import { useState, useEffect } from 'react';
const PRAYERS=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const EMOJIS={Fajr:'🌙',Dhuhr:'☀️',Asr:'🌤️',Maghrib:'🌇',Isha:'🌃'};
function gk(d){return'np_done_'+d.toDateString()}
export default function TrackerPage(){
  const[done,setDone]=useState([]);const[streak,setStreak]=useState(0);const[view,setView]=useState('today');const[mdata,setMdata]=useState({});
  const today=new Date();
  function loadStreak(){let s=0,d=new Date();while(true){const dd=JSON.parse(localStorage.getItem(gk(d))||'[]');if(dd.length===5){s++;d.setDate(d.getDate()-1)}else break}return s}
  function loadMonth(){const data={};const d=new Date(today.getFullYear(),today.getMonth(),1);while(d.getMonth()===today.getMonth()){data[d.getDate()]=(JSON.parse(localStorage.getItem(gk(d))||'[]')).length;d.setDate(d.getDate()+1)}setMdata(data)}
  useEffect(()=>{setDone(JSON.parse(localStorage.getItem(gk(today))||'[]'));setStreak(loadStreak());loadMonth()},[]);
  function toggle(p){const nd=done.includes(p)?done.filter(x=>x!==p):[...done,p];setDone(nd);localStorage.setItem(gk(today),JSON.stringify(nd));const s=loadStreak();setStreak(s);localStorage.setItem('np_streak',String(s));loadMonth()}
  const pct=Math.round((done.length/5)*100);const dim=new Date(today.getFullYear(),today.getMonth()+1,0).getDate();const fd=new Date(today.getFullYear(),today.getMonth(),1).getDay();
  return(<div style={{maxWidth:500,margin:'0 auto',padding:'0 16px'}}>
    <div style={{paddingTop:56,paddingBottom:16}}><h1 className="text-gold" style={{fontSize:28,fontWeight:800}}>Prayer Tracker</h1><p style={{color:'#6a7a8a',fontSize:14,marginTop:4}}>Build consistency, one prayer at a time</p></div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:20}}>
      {[{l:'Today',v:done.length+'/5',c:'#1a6b4a'},{l:'Streak',v:streak+'d',c:'#c9a227'},{l:'Month',v:Object.values(mdata).filter(x=>x===5).length+'✓',c:'#4a2a7a'}].map(({l,v,c})=>(<div key={l} className="card" style={{padding:'12px 10px',textAlign:'center',borderTop:'3px solid '+c}}><div style={{fontSize:20,fontWeight:800,color:'#fff'}}>{v}</div><div style={{fontSize:10,color:'#6a7a8a',marginTop:2,fontWeight:600,letterSpacing:0.5}}>{l.toUpperCase()}</div></div>))}
    </div>
    <div className="card" style={{padding:'14px 16px',marginBottom:16}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}><span style={{fontSize:13,fontWeight:600,color:'#ccc'}}>Today's Progress</span><span style={{fontSize:13,fontWeight:700,color:'#c9a227'}}>{pct}%</span></div><div style={{height:8,background:'rgba(255,255,255,0.08)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',width:pct+'%',background:'linear-gradient(90deg,#1a6b4a,#c9a227)',borderRadius:4,transition:'width 0.5s ease'}}/></div></div>
    <div style={{display:'flex',gap:8,marginBottom:16}}>
      {['today','calendar'].map(t=>(<button key={t} onClick={()=>setView(t)} style={{flex:1,padding:'9px',borderRadius:11,border:'1px solid',cursor:'pointer',fontWeight:600,fontSize:13,background:view===t?'linear-gradient(135deg,#1a6b4a,#0a3622)':'rgba(255,255,255,0.04)',color:view===t?'#f0d060':'#6a7a8a',borderColor:view===t?'rgba(201,162,39,0.4)':'rgba(255,255,255,0.08)'}}>{t==='today'?"📋 Today's":"📅 Calendar"}</button>))}
    </div>
    {view==='today'&&(<div>
      {PRAYERS.map(p=>{const ck=done.includes(p);return(<div key={p} onClick={()=>toggle(p)} className={ck?'prayer-active':'card'} style={{marginBottom:10,padding:'16px',cursor:'pointer',display:'flex',alignItems:'center',gap:14,borderRadius:16,border:ck?'1px solid rgba(201,162,39,0.35)':'1px solid rgba(255,255,255,0.07)'}}><div style={{width:44,height:44,borderRadius:'50%',background:ck?'linear-gradient(135deg,#1a6b4a,#0a3622)':'rgba(255,255,255,0.05)',border:ck?'2px solid #c9a227':'2px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{ck?'✓':EMOJIS[p]}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:16,color:ck?'#f0d060':'#ccc'}}>{p}</div><div style={{fontSize:12,color:ck?'#6a9a6a':'#5a6a7a',marginTop:1}}>{ck?'Completed — BarakAllahu feek':'Tap to mark complete'}</div></div>{ck&&<div style={{color:'#c9a227',fontSize:18}}>✓</div>}</div>);})}
      {done.length===5&&(<div className="card-gold" style={{marginTop:16,padding:'16px',textAlign:'center'}}><div style={{fontSize:28,marginBottom:4}}>🎉</div><div style={{fontWeight:700,color:'#f0d060',fontSize:16}}>All 5 Prayers Complete!</div><div style={{fontSize:13,color:'#8a9a6a',marginTop:4}}>Alhamdulillah — may Allah accept your prayers</div></div>)}
    </div>)}
    {view==='calendar'&&(<div className="card" style={{padding:'16px'}}>
      <div style={{textAlign:'center',fontWeight:700,color:'#c9a227',marginBottom:14,fontSize:14}}>{today.toLocaleString('default',{month:'long',year:'numeric'})}</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,marginBottom:8}}>{['S','M','T','W','T','F','S'].map((d,i)=>(<div key={i} style={{textAlign:'center',fontSize:10,color:'#5a6a7a',fontWeight:600,padding:'4px 0'}}>{d}</div>))}</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2}}>
        {Array(fd).fill(null).map((_,i)=><div key={'e'+i}/>)}
        {Array(dim).fill(null).map((_,i)=>{const day=i+1;const c=mdata[day]||0;const it=day===today.getDate();const bg=c===5?'#1a6b4a':c>=3?'rgba(26,107,74,0.4)':c>0?'rgba(201,162,39,0.2)':'rgba(255,255,255,0.04)';return(<div key={day} style={{aspectRatio:'1',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8,background:bg,border:it?'2px solid #c9a227':'1px solid transparent',fontSize:11,fontWeight:it?800:500,color:c===5?'#fff':it?'#c9a227':'#6a7a8a'}}>{day}</div>);})}
      </div>
      <div style={{display:'flex',gap:12,marginTop:14,justifyContent:'center'}}>{[['#1a6b4a','5/5'],['rgba(26,107,74,0.5)','3-4'],['rgba(201,162,39,0.3)','1-2'],['rgba(255,255,255,0.08)','0']].map(([c,l])=>(<div key={l} style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:12,height:12,borderRadius:3,background:c}}/><span style={{fontSize:10,color:'#5a6a7a'}}>{l}</span></div>))}</div>
    </div>)}
    <div style={{height:20}}/>
  </div>);
}