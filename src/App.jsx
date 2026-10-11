import {useEffect,useRef,useState} from 'react';
import {AppProvider,useApp} from './store.jsx';
import {Fx} from './components/ui.jsx';
import {SCREENS,NAV} from './screens.jsx';
import {fmt} from './lib/util.js';
function Shell(){
const {S,d,mode,setMode,theme,setTheme,L,nudge}=useApp(),[cur,setCur]=useState('overview'),Scr=SCREENS[cur],n=NAV.find(x=>x[0]===cur);
const tip=useRef();tip.current=()=>{const subs=S.bills.filter(b=>b.on&&b.c==='Subscriptions'),t=[L(`Daily allowance: ${fmt(d.daily)}. You've got ${fmt(d.left)} in the tank.`,`Daddy chill: ${fmt(d.daily)} a day, ${fmt(d.left)} in the tank.`),`${subs.length} subscriptions renew for ${fmt(subs.reduce((s,b)=>s+b.a,0))} a month.`,`${S.streak}-day streak: you stayed under your daily allowance.`];if(S.wish.length)t.push(`That wishlist item (${S.wish[0].n}) is waiting. Still want it?`);if(mode==='chill')t.push('Bas kar bhai. Cart khaali kar.','I saw that 👀');nudge(t[Math.floor(Math.random()*t.length)])};
useEffect(()=>{const a=setTimeout(()=>tip.current(),9000),b=setInterval(()=>tip.current(),45000);return()=>{clearTimeout(a);clearInterval(b)}},[]);
return <div className="ap">
<div className="ap-side"><div className="logo" style={{padding:'6px 12px 14px'}}>Mabel <span style={{color:'var(--rose)'}}>♡</span></div><div className="mono" style={{padding:'0 12px 8px'}}>YOUR MONEY UNIVERSE</div>
{NAV.map((x,i)=><a key={x[0]} className={cur===x[0]?'on':''} tabIndex={0} role="link" onClick={()=>{setCur(x[0]);scrollTo(0,0)}} onKeyDown={e=>e.key==='Enter'&&setCur(x[0])}><span>{x[2]}</span>{x[1]}<small className="mono" style={{marginLeft:'auto'}}>{String(i+1).padStart(2,'0')}</small></a>)}</div>
<div className="ap-wrap"><div className="ap-top"><div className="mono"><span className="dot"/> YOUR MONEY ERA / <b>{n[1].toUpperCase()}</b></div>
<div className="ap-tools"><button className="chip" onClick={()=>setMode(mode==='chill'?'aesthetic':'chill')}>{mode==='chill'?'😎 Vibe: Chill':'✿ Vibe: Aesthetic'}</button><button className="tg" aria-label="Switch light and dark" onClick={()=>setTheme(theme==='dark'?'light':'dark')}><i/></button><span className="pill">{S.aura} aura ✦</span><div className="ap-av">D</div></div></div>
<main className="ap-main" key={cur+mode}><Scr go={setCur}/></main>
<div className="vibe"><div><b className="hand" style={{fontSize:30}}>Pick your vibe</b><br/><small className="mut">Same Mabel, different mood.</small></div><div className="seg" role="radiogroup" aria-label="Site mood"><i/>{[['aesthetic','✨ Aesthetic'],['chill','😎 Chill']].map(([m,t])=><button key={m} role="radio" aria-checked={mode===m} onClick={()=>setMode(m)}>{t}</button>)}</div></div></div>
<Fx/></div>}
export default function App(){return <AppProvider><Shell/></AppProvider>}
