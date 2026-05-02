'use client';
import { useState, useEffect } from 'react';
const PRAYERS = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const ICONS = {Fajr:'🌙',Sunrise:'🌅',Dhuhr:'☀️',Asr:'🌤️',Maghrib:'🌇',Isha:'🌃'};
function fmtTime(t){if(!t)return'--:--';const[h,m]=t.split(':').map(Number);const ap=h>=12?'PM':'AM';return((h%12)||12)+':'+String(m).padStart(2,'0')+' '+ap}
function timeToMins(t){if(!t)return 0;const[h,m]=t.split(':').map(Number);return h*60+m}
function getGreeting(){const h=new Date().getHours();if(h<5)return{text:'As-salamu alaykum',sub:'Fajr time approaches — rise and pray'};if(h<12)return{text:'Good Morning',sub:'Begin your day with Bismillah'};if(h<17)return{text:'Good Afternoon',sub:'Dhuhr and Asr await your devotion'};if(h<20)return{text:'Good Evening',sub:'Maghrib calls as the sun sets'};return{text:'Good Night',sub:'End your day in gratitude to Allah'}}
const FEATURES=[{href:'/learn',emoji:'📖',title:'Learn to Pray',desc:'Step-by-step salah guide',color:'#1a6b4a'},{href:'/quran',emoji:'📿',title:"Read Quran",desc:'Surahs with translation',color:'#2a4a7a'},{href:'/tracker',emoji:'✅',title:'Prayer Tracker',desc:'Track your daily prayers',color:'#4a2a7a'},{href:'/qibla',emoji:'🧭',title:'Qibla Finder',desc:'Direction toward Mecca',color:'#7a4a2a'},{href:'/tasbeeh',emoji:'🔮',title:'Tasbeeh',desc:'Digital dhikr counter',color:'#1a4a6b'}];
export default function HomePage(){
  const[times,setTimes]=useState(null);const[next,setNext]=useState(null);const[cd,setCd]=useState({h:'--',m:'--',s:'--'});const[loading,setLoading]=useState(true);const[streak,setStreak]=useState(0);const[todayDone,setTodayDone]=useState(0);const[loc,setLoc]=useState(null);
  const g=getGreeting();
  useEffect(()=>{setStreak(parseInt(localStorage.getItem('np_streak')||'0'));const t=new Date().toDateString();setTodayDone(JSON.parse(localStorage.getItem('np_done_'+t)||'[]').length)},[]);
  useEffect(()=>{navigator.geolocation?.getCurrentPosition(p=>setLoc({lat:p.coords.latitude,lon:p.coords.longitude}),()=>setLoc({lat:21.4225,lon:39.8262,fb:true}))},[]);
  useEffect(()=>{if(!loc)return;fetch('https://api.aladhan.com/v1/timings?latitude='+loc.lat+'&longitude='+loc.lon+'&method=2').then(r=>r.json()).then(d=>{if(d.data?.timings){setTimes(d.data.timings);setLoading(false)}}).catch(()=>setLoading(false))},[loc]);
  useEffect(()=>{if(!times)return;const tick=()=>{const now=new Date();const cur=now.getHours()*60+now.getMinutes()+now.getSeconds()/60;let np=null,md=Infinity;PRAYERS.forEach(p=>{let diff=timeToMins(times[p])-cur;if(diff<0)diff+=1440;if(diff<md){md=diff;np=p}});setNext(np);const ts=Math.round(md*60);setCd({h:String(Math.floor(ts/3600)).padStart(2,'0'),m:String(Math.floor((ts%3600)/60)).padStart(2,'0'),s:String(ts%60).padStart(2,'0')})};tick();const id=setInterval(tick,1000);return()=>clearInterval(id)},[times]);
  const S=(s,p={})=>({...p,...s});
  return(<div style={{maxWidth:500,margin:'0 auto',padding:'0 16px'}}>
    <div style={{paddingTop:56,paddingBottom:8}}>
      <div style={{fontSize:12,color:'#c9a227',fontWeight:600,letterSpacing:1.5,textTransform:'uppercase',marginBottom:4,fontFamily:'Amiri,serif'}}>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
      <h1 style={{fontSize:28,fontWeight:800,color:'#fff',margin:0}}>{g.text}</h1>
      <p style={{fontSize:14,color:'#8892a4',marginTop:4}}>{g.sub}</p>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:16}}>
      <div className="card-emerald" style={{padding:'14px 16px'}}><div style={{fontSize:11,color:'#6db891',fontWeight:600,letterSpacing:0.8}}>TODAY</div><div style={{fontSize:28,fontWeight:800,color:'#fff',marginTop:2}}>{todayDone}<span style={{fontSize:16,color:'#5a7a6a'}}>/5</span></div></div>
      <div className="card-gold" style={{padding:'14px 16px'}}><div style={{fontSize:11,color:'#c9a227',fontWeight:600,letterSpacing:0.8}}>STREAK</div><div style={{fontSize:28,fontWeight:800,color:'#fff',marginTop:2}}>{streak}<span style={{fontSize:14,color:'#8a7a4a'}}> days</span></div></div>
    </div>
    <div className="card-gold glow-gold" style={{marginTop:16,padding:'22px 20px',textAlign:'center'}}>
      <div style={{fontSize:11,color:'#c9a227',fontWeight:600,letterSpacing:1.5,textTransform:'uppercase',marginBottom:8}}>Next Prayer</div>
      <div style={{fontSize:22,fontWeight:800,color:'#fff',marginBottom:12}}>{next?ICONS[next]+' '+next:'—'}{next&&times&&<span style={{fontSize:13,color:'#c9a227',marginLeft:8}}>({fmtTime(times[next])})</span>}</div>
      <div style={{display:'flex',justifyContent:'center',gap:8}}>
        {[cd.h,cd.m,cd.s].map((v,i)=>(<div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center'}}><div style={{background:'rgba(201,162,39,0.12)',border:'1px solid rgba(201,162,39,0.25)',borderRadius:10,padding:'8px 12px',fontFamily:'monospace',fontSize:28,fontWeight:800,color:'#f0d060',minWidth:52,textAlign:'center'}}>{v}</div><div style={{fontSize:9,color:'#6a5a2a',marginTop:3,letterSpacing:0.5}}>{['HRS','MIN','SEC'][i]}</div></div>))}
      </div>
      {loc?.fb&&<div style={{fontSize:11,color:'#5a6a4a',marginTop:10}}>📍 Allow location for accurate times</div>}
    </div>
    <div className="card" style={{marginTop:16,padding:'4px 4px'}}>
      <div style={{padding:'12px 16px 8px',fontSize:12,color:'#6a7a8a',fontWeight:600,letterSpacing:0.8,textTransform:'uppercase'}}>Today's Prayers</div>
      {loading?PRAYERS.filter(p=>p!=='Sunrise').map(p=>(<div key={p} style={{padding:'12px 16px',display:'flex',justifyContent:'space-between'}}><div className="skeleton" style={{width:70,height:18}}/><div className="skeleton" style={{width:60,height:18}}/></div>)):PRAYERS.filter(p=>p!=='Sunrise').map(p=>{const isA=p===next;return(<div key={p} className={isA?'prayer-active':''} style={{padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',margin:'2px 4px',borderRadius:12}}><div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:18}}>{ICONS[p]}</span><span style={{fontWeight:isA?700:500,color:isA?'#f0d060':'#ccc',fontSize:15}}>{p}</span></div><div style={{display:'flex',alignItems:'center',gap:8}}><span style={{color:isA?'#c9a227':'#6a7a8a',fontWeight:600,fontSize:14}}>{fmtTime(times?.[p])}</span>{isA&&<span style={{background:'#c9a227',color:'#040d1a',fontSize:9,fontWeight:800,padding:'2px 7px',borderRadius:20}}>NEXT</span>}</div></div>);})}
    </div>
    <div style={{marginTop:20,marginBottom:8}}>
      <div style={{fontSize:12,color:'#6a7a8a',fontWeight:600,letterSpacing:0.8,textTransform:'uppercase',marginBottom:12}}>Features</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        {FEATURES.map(({href,emoji,title,desc,color})=>(<a key={href} href={href} style={{textDecoration:'none'}}><div className="card" style={{padding:'16px 14px',cursor:'pointer',borderLeft:'3px solid '+color+'60'}}><div style={{fontSize:24,marginBottom:6}}>{emoji}</div><div style={{fontSize:13,fontWeight:700,color:'#fff',marginBottom:2}}>{title}</div><div style={{fontSize:11,color:'#5a6a7a',lineHeight:1.4}}>{desc}</div></div></a>))}
      </div>
    </div>
    <div style={{height:20}}/>
  </div>);
}