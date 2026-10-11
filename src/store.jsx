import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {B,BC} from './lib/badges.js';
export const LBL={wait:'wait a week',skip:'skip something',buyl:'make a small buy',buym:'make a bigger buy',buyh:'make a reckless buy'};
const EV={streak7:['frog','aura'],nospend:['duck'],cancel:['sloth'],forgot:['bruh'],quest30:['cat'],regret:['fahhh'],quiet7:['relax']};
const KEY='mabel-app-v1';
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const seed=()=>({name:'Demo',budget:10000,day:11,streak:3,aura:20,quiet:0,scr:0,on:[],wish:[],regret:{},
tx:[['Freelance payment','Money in',1500,11],['Auto','Transport',-80,10],['Netflix','Subscriptions',-199,9],['Wi-Fi share','Bills',-350,8],['Boba','Food & chai',-180,7],['Movie night','Fun & outings',-250,6],['Chai','Food & chai',-120,5],['Zomato','Food delivery',-290,4],['Chai','Food & chai',-40,4],['Amazon order','Shopping',-799,3],['Metro','Transport',-60,2]].map((r,i)=>({id:i+1,n:r[0],c:r[1],a:r[2],d:r[3]})),
goals:[['Emergency fund','🛟',1200,3000],['Jaipur weekend','🕌',1800,5000],['New headphones','🎧',500,2500]].map((r,i)=>({id:i+1,n:r[0],e:r[1],s:r[2],t:r[3]})),
bills:[['Hostel rent','Bills',979,1],['Wi-Fi share','Bills',350,8],['Phone recharge','Bills',299,15],['Netflix','Subscriptions',199,9],['Spotify','Subscriptions',119,20]].map((r,i)=>({id:i+1,n:r[0],c:r[1],a:r[2],due:r[3],on:1})),
quests:[['Broke But Functional','Survive 30 days on ₹10,000.',30,150,11,1],['No Food Delivery','Your kitchen misses you.',14,100,0,0],['Cash Only Week',"You'll feel every rupee.",7,80,0,0],['Subscription Purge','Find the ones you forgot about.',3,60,0,0]].map((r,i)=>({id:i+1,n:r[0],d:r[1],days:r[2],r:r[3],p:r[4],on:r[5],done:0})),
plan:{Shopping:1500,Bills:2000,'Food & chai':1200,'Food delivery':800,'Fun & outings':800,Subscriptions:500,Transport:600}});
const load=()=>{try{const s=JSON.parse(ls.get(KEY));if(s&&s.tx)return s}catch(e){}return seed()};
const derive=S=>{const ex=S.tx.filter(t=>t.a<0),out=-ex.reduce((s,t)=>s+t.a,0),inc=S.tx.filter(t=>t.a>0).reduce((s,t)=>s+t.a,0),left=S.budget+inc-out,dl=Math.max(1,30-S.day),m={};ex.forEach(t=>m[t.c]=(m[t.c]||0)-t.a);return{out,inc,left,dl,daily:left/dl,cats:Object.entries(m).sort((a,b)=>b[1]-a[1]),fixed:S.bills.filter(b=>b.on).reduce((s,b)=>s+b.a,0)}};
const Ctx=createContext(null);
export const useApp=()=>useContext(Ctx);
export function AppProvider({children}){
const [S,setS]=useState(load),[mode,setMode]=useState(()=>ls.get('mabel-mode')==='chill'?'chill':'aesthetic'),[theme,setTheme]=useState(()=>ls.get('mabel-theme')==='dark'?'dark':'light'),[fx,setFx]=useState({});
useEffect(()=>{ls.set(KEY,JSON.stringify(S))},[S]);
useEffect(()=>{const r=document.documentElement;r.dataset.mode=mode;r.dataset.theme=theme;r.lang=mode==='chill'?'hi-Latn':'en';ls.set('mabel-mode',mode);ls.set('mabel-theme',theme)},[mode,theme]);
const d=useMemo(()=>derive(S),[S]);
const L=(a,c)=>mode==='chill'?c:a;
const set=(mode==='chill'?BC:B).map(b=>({...b,on:S.on.includes(b.id)}));
const up=fn=>setS(p=>{const n=structuredClone(p);fn(n);return n});
const nudge=(text,force)=>setFx(f=>S.quiet&&!force?f:{...f,nudge:{text,k:Date.now()}});
const gain=v=>setFx(f=>({...f,gain:{v,k:Date.now()}}));
const award=id=>{const b=set.find(x=>x.id==id);if(!b||b.on)return;up(n=>{if(!n.on.includes(id))n.on.push(id)});setFx(f=>({...f,award:{...b,k:Date.now()}}))};
const unlock=ev=>(EV[ev]||[]).forEach(award);
const decide=key=>{const v={skip:30,wait:20,buyl:10,buym:5,buyh:-15}[key],a1=Math.max(0,S.aura+v),chk=v<0?S.aura:a1;up(n=>{n.aura=a1});gain(v);const b=set.find(x=>x.k==key&&!x.on&&x.n<=chk);if(b)setTimeout(()=>award(b.id),450)};
const value={S,d,up,mode,setMode,theme,setTheme,L,set,fx,setFx,nudge,gain,award,unlock,decide};
return <Ctx.Provider value={value}>{children}</Ctx.Provider>}
