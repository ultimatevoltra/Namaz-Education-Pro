'use client';
import { useState, useEffect, useCallback } from 'react';
const DHIKR=[{id:'subhanallah',arabic:'سُبْحَانَ اللَّهِ',tr:'SubhanAllah',meaning:'Glory be to Allah',target:33,color:'#1a6b4a'},{id:'alhamdulillah',arabic:'الحَمْدُ لِلَّهِ',tr:'Alhamdulillah',meaning:'Praise be to Allah',target:33,color:'#2a4a7a'},{id:'allahu_akbar',arabic:'اللَّهُ أَكْبَر',tr:'Allahu Akbar',meaning:'Allah is the Greatest',target:34,color:'#7a2a4a'},{id:'astaghfirullah',arabic:'أَسْتَغْفِرُ اللَّهَ',tr:'Astaghfirullah',meaning:'I seek forgiveness from Allah',target:100,color:'#4a2a7a'},{id:'la_ilaha',arabic:'لَا إِلَٰهَ إِلَّا اللَّهُ',tr:'La ilaha illallah',meaning:'There is no god but Allah',target:100,color:'#7a4a1a'},{id:'salawat',arabic:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّد',tr:'Allahumma Salli ala Muhammad',meaning:'Blessings upon Prophet Muhammad ﷺ',target:100,color:'#1a4a6b'}];
export default function TasbeehPage(){
  const[sid,setSid]=useState('subhanallah');const[count,setCount]=useState(0);const[history,setHistory]=useState([]);const[total,setTotal]=useState(0);const[bounce,setBounce]=useState(false);
  const sel=DHIKR.find(d=>d.id===sid);
  useEffect(()=>{const h=JSON.parse(localStorage.getItem('np_th')||'[]');setHistory(h);setTotal(h.reduce((s,x)=>s+x.count,0))},[]);
  useEffect(()=>{setCount(parseInt(localStorage.getItem('np_t_'+sid)||'0'))},[sid]);
  const inc=useCallback(()=>{setBounce(true);setTimeout(()=>setBounce(false),150);const nc=count+1;setCount(nc);localStorage.setItem('np_t_'+sid,String(nc));if(nc===sel.target){const e={dhikr:sel.tr,count:nc,time:new Date().toLocaleString()};const nh=[e,...history.slice(0,19)];setHistory(nh);localStorage.setItem('np_th',JSON.stringify(nh));setTotal(total+nc)}},[count,sel,sid,history,total]);
  function reset(){if(count>0){const e={dhikr:sel.tr,count,time:new Date().toLocaleString()};const nh=[e,...history.slice(0,19)];setHistory(nh);localStorage.setItem('np_th',JSON.stringify(nh))}setCount(0);localStorage.setItem('np_t_'+sid,'0')}
  const pct=Math.min((count/sel.target)*100,100);const done=count>=sel.target;
  return(<div style={{maxWidth:500,margin:'0 auto',padding:'0 16px'}}>
    <div style={{paddingTop:56,paddingBottom:8}}><h1 className="text-gold" style={{fontSize:28,fontWeight:800}}>Tasbeeh</h1><p style={{color:'#6a7a8a',fontSize:14,marginTop:4}}>Digital dhikr counter — remember Allah often</p></div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20,marginTop:8}}>
      <div className="card" style={{padding:'12px',textAlign:'center'}}><div style={{fontSize:22,fontWeight:800,color:'#c9a227'}}>{total.toLocaleString()}</div><div style={{fontSize:10,color:'#5a6a7a',marginTop:2,fontWeight:600}}>TOTAL DHIKR</div></div>
      <div className="card" style={{padding:'12px',textAlign:'center'}}><div style={{fontSize:22,fontWeight:800,color:'#fff'}}>{history.length}</div><div style={{fontSize:10,color:'#5a6a7a',marginTop:2,fontWeight:600}}>SESSIONS</div></div>
    </div>
    <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:8,marginBottom:16,scrollbarWidth:'none'}}>
      {DHIKR.map(d=>(<button key={d.id} onClick={()=>setSid(d.id)} style={{flexShrink:0,padding:'7px 12px',borderRadius:20,border:'1px solid',cursor:'pointer',fontSize:11,fontWeight:600,transition:'all 0.2s',background:sid===d.id?d.color:'rgba(255,255,255,0.04)',color:sid===d.id?'#fff':'#6a7a8a',borderColor:sid===d.id?d.color+'80':'rgba(255,255,255,0.08)'}}>{d.tr}</button>))}
    </div>
    <div className="card-gold" style={{marginBottom:20,padding:'16px',textAlign:'center'}}><div style={{fontFamily:'Amiri,serif',fontSize:26,color:'#f0d060',lineHeight:1.6,marginBottom:6}}>{sel.arabic}</div><div style={{fontSize:14,color:'#c9a227',fontWeight:600}}>{sel.tr}</div><div style={{fontSize:12,color:'#8a9aaa',marginTop:2}}>{sel.meaning}</div><div style={{marginTop:8}}><span style={{fontSize:11,color:'#5a6a7a'}}>Target: </span><span style={{fontSize:11,color:'#c9a227',fontWeight:700}}>{sel.target} times</span></div></div>
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:20,marginBottom:24}}>
      <div style={{position:'relative',width:220,height:220}}>
        <svg width="220" height="220" style={{position:'absolute',inset:0,transform:'rotate(-90deg)'}}>
          <circle cx="110" cy="110" r="96" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
          <circle cx="110" cy="110" r="96" fill="none" stroke={sel.color} strokeWidth="8" strokeLinecap="round" strokeDasharray={2*Math.PI*96} strokeDashoffset={2*Math.PI*96*(1-pct/100)} style={{transition:'stroke-dashoffset 0.3s ease'}}/>
        </svg>
        <button onClick={inc} className="tasbih-btn" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:160,height:160,background:done?'radial-gradient(circle at 35% 35%,'+sel.color+'dd,#0a3622)':'radial-gradient(circle at 35% 35%,#2a8a62,#0a3622)',scale:bounce?'0.94':'1'}}>
          <div style={{fontSize:46,fontWeight:900,color:'#fff',lineHeight:1}}>{count}</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:2}}>of {sel.target}</div>
          {done&&<div style={{fontSize:14,marginTop:2}}>✓</div>}
        </button>
      </div>
      {done&&(<div style={{background:sel.color+'30',border:'1px solid '+sel.color+'60',borderRadius:14,padding:'10px 20px',textAlign:'center'}}><div style={{fontWeight:700,color:'#fff',fontSize:14}}>🎉 Target reached! May Allah accept.</div></div>)}
      <div style={{display:'flex',gap:10}}>
        <button onClick={inc} className="btn-primary" style={{padding:'12px 28px',fontSize:15}}>+ Count</button>
        <button onClick={reset} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#aaa',borderRadius:14,padding:'12px 20px',cursor:'pointer',fontSize:13,fontWeight:600}}>Reset</button>
      </div>
    </div>
    {history.length>0&&(<div><div style={{fontSize:12,color:'#5a6a7a',fontWeight:600,letterSpacing:0.5,marginBottom:10,textTransform:'uppercase'}}>Recent Sessions</div>{history.slice(0,5).map((h,i)=>(<div key={i} className="card" style={{marginBottom:8,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:13,fontWeight:600,color:'#ccc'}}>{h.dhikr}</div><div style={{fontSize:11,color:'#5a6a7a',marginTop:1}}>{h.time}</div></div><div style={{fontSize:16,fontWeight:800,color:'#c9a227'}}>×{h.count}</div></div>))}</div>)}
    <div style={{height:20}}/>
  </div>);
}