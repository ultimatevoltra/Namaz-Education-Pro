'use client';
import { useState, useEffect } from 'react';
function calcQ(lat,lon){const ML=21.4225*Math.PI/180,MLo=39.8262*Math.PI/180,ul=lat*Math.PI/180,dl=MLo-lon*Math.PI/180;const y=Math.sin(dl)*Math.cos(ML),x=Math.cos(ul)*Math.sin(ML)-Math.sin(ul)*Math.cos(ML)*Math.cos(dl);return((Math.atan2(y,x)*180/Math.PI)+360)%360}
function dist(lat,lon){const R=6371,dL=(21.4225-lat)*Math.PI/180,dLo=(39.8262-lon)*Math.PI/180,a=Math.sin(dL/2)**2+Math.cos(lat*Math.PI/180)*Math.cos(21.4225*Math.PI/180)*Math.sin(dLo/2)**2;return Math.round(R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)))}
export default function QiblaPage(){
  const[q,setQ]=useState(null);const[hdg,setHdg]=useState(0);const[d,setD]=useState(null);const[status,setStatus]=useState('Requesting location...');
  useEffect(()=>{navigator.geolocation?.getCurrentPosition(p=>{const{latitude:lat,longitude:lon}=p.coords;setQ(calcQ(lat,lon));setD(dist(lat,lon));setStatus('Qibla: '+Math.round(calcQ(lat,lon))+'° from North')},()=>{setQ(calcQ(21.4225,39.8262));setStatus('Using Mecca as default location')})},[]);
  useEffect(()=>{const h=e=>{const a=e.webkitCompassHeading??e.alpha??0;setHdg(a)};if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission!=='function'){window.addEventListener('deviceorientation',h,true);return()=>window.removeEventListener('deviceorientation',h,true)}},[]);
  const needle=q!==null?q-hdg:0;
  return(<div style={{maxWidth:500,margin:'0 auto',padding:'0 16px',textAlign:'center'}}>
    <div style={{paddingTop:56,paddingBottom:16}}><h1 className="text-gold" style={{fontSize:28,fontWeight:800}}>Qibla Finder</h1><p style={{color:'#6a7a8a',fontSize:14,marginTop:4}}>Direction toward the Kaaba in Mecca</p></div>
    {d&&(<div className="card-emerald" style={{padding:'10px 20px',marginBottom:20,display:'inline-block',borderRadius:14}}><span style={{color:'#6db891',fontSize:13,fontWeight:600}}>📍 Distance to Mecca: </span><span style={{color:'#fff',fontSize:15,fontWeight:800}}>{d.toLocaleString()} km</span></div>)}
    <div style={{display:'flex',justifyContent:'center',marginBottom:24}}>
      <div style={{position:'relative',width:260,height:260}}>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'2px solid rgba(201,162,39,0.3)',background:'radial-gradient(circle at 50% 40%,rgba(26,107,74,0.15),rgba(4,13,26,0.8))'}}>
          {[['N',0],['E',90],['S',180],['W',270]].map(([l,deg])=>{const r=(deg-hdg)*Math.PI/180,rr=110,x=130+rr*Math.sin(r),y=130-rr*Math.cos(r);return<div key={l} style={{position:'absolute',left:x-8,top:y-8,width:16,height:16,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:l==='N'?'#e07070':'#6a7a8a'}}>{l}</div>})}
        </div>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:'100%',height:'100%',position:'relative',transform:'rotate('+needle+'deg)',transition:'transform 0.3s ease'}}>
            <div style={{position:'absolute',top:20,left:'50%',transform:'translateX(-50%)',fontSize:24}}>🕋</div>
            <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-100%)',width:4,height:90,borderRadius:'2px 2px 0 0',background:'linear-gradient(to top,transparent,#c9a227)'}}/>
            <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,0)',width:4,height:70,borderRadius:'0 0 2px 2px',background:'linear-gradient(to bottom,transparent,rgba(255,255,255,0.15))'}}/>
          </div>
        </div>
        <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:16,height:16,borderRadius:'50%',background:'#c9a227',boxShadow:'0 0 12px rgba(201,162,39,0.6)'}}/>
      </div>
    </div>
    <div className="card-gold" style={{padding:'14px 20px',marginBottom:16}}><div style={{fontSize:14,color:'#f0d060',fontWeight:700}}>{status}</div>{q&&<div style={{fontSize:12,color:'#8a7a4a',marginTop:4}}>Rotate your device — the 🕋 points to Mecca</div>}</div>
    <div className="card" style={{padding:'16px',textAlign:'left'}}>
      <div style={{fontSize:12,color:'#5a6a7a',fontWeight:600,letterSpacing:0.5,marginBottom:10,textTransform:'uppercase'}}>Tips for accuracy</div>
      {['Hold your phone flat and level','Move away from metal objects and electronics','Allow location access for precise direction','Face the 🕋 direction for your Salah'].map((t,i)=>(<div key={i} style={{fontSize:12,color:'#8a9aaa',marginBottom:6,paddingLeft:4}}>· {t}</div>))}
    </div>
    <div style={{height:20}}/>
  </div>);
}