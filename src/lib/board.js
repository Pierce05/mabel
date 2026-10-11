import {B,BC,rose,T} from './badges.js';
const $=id=>document.getElementById(id);
// vision board
export function initBoard(){var W=900,H=600,bd=$('bd'),bw=$('bw'),tray=$('tray'),bt=$('bt'),items=[],sel=null,k=1,zc=1,drag=null,bgi=0,tm,touch=0,
F=['','Caveat,cursive',"'Playfair Display',serif","'Permanent Marker',cursive"],
NAT={note:[170,150],text:[120,46],quote:[230,76],badge:[130,172],emoji:[64,70],tape:[120,30],goal:[220,110]},
COLS=['#1f1f1f','#C4566F','#ffffff','#FFB3A7','#C7C3FF','#A7BB9A','#fff1a8'],BGS=['#fffdf8','#F7E6E8','#dbe6d2','#1f1f1f'];
var defs=[],G=[['Sticky notes'],['Write'],['Quotes'],['Badges'],['Stickers'],['Tape'],['Goals']];
['#FFB3A7','#C7C3FF','#A7BB9A','#fff1a8','#F7E6E8'].forEach(function(c){defs.push({g:0,t:'note',c:c,txt:'write here',ps:.42})});
[[1,'my goal:'],[2,'Dream big'],[3,'NO SPEND DAY']].forEach(function(a){defs.push({g:1,t:'text',f:a[0],txt:a[1],pv:'Aa',ps:.8})});
['money loves discipline.','good money, brighter days','financially stable girl era','small choices today, a freer tomorrow','not broke, just in my pre-rich arc','spend on things that align with the life i want'].forEach(function(q){defs.push({g:2,t:'quote',f:2,txt:q,ps:.5})});
B.concat(BC).forEach(function(b){defs.push({g:3,t:'badge',k:b.id,ps:.42})});
['💸','🌱','✈️','💻','☕','🏠','🎯','✨','♡','🛍️','🐷','📈','💅','🔒'].forEach(function(e){defs.push({g:4,t:'emoji',k:e,ps:.62})});
['#FFB3A7','#C7C3FF','#A7BB9A','#D7B8C7'].forEach(function(c){defs.push({g:5,t:'tape',k:c,ps:.6})});
defs.push({g:6,t:'goal',txt:'Weekend trip · ₹5,000',ps:.5});
var seed=[{t:'note',c:'#fff1a8',txt:'earn\nsave\nspend wisely\nbe proud\nrepeat ♡',x:50,y:70,r:-4,s:1.25},{t:'quote',f:2,txt:'money loves discipline.',x:330,y:60,r:3},{t:'badge',k:'snail',x:660,y:40,r:7},{t:'goal',txt:'Weekend trip · ₹5,000',x:330,y:230,r:-2},{t:'text',f:3,c:'#C4566F',txt:'good money, brighter days',x:60,y:400,r:-3},{t:'emoji',k:'✨',x:600,y:260,s:1.2},{t:'badge',k:'cried',x:690,y:380,r:-8},{t:'tape',k:'#C7C3FF',x:300,y:42,r:-14},{t:'emoji',k:'✈️',x:480,y:430,r:10}];
function fit(){k=Math.min(1,bw.clientWidth/W)||1;bd.style.transform='scale('+k+')';bw.style.height=H*k+'px'}
function place(it){var e=it.el;e.style.left=it.x+'px';e.style.top=it.y+'px';e.style.zIndex=it.z;e.style.transform='rotate('+it.r+'deg) scale('+it.s+')'}
function build(it,pv){var e=document.createElement('div'),h='';e.className='it t-'+it.t+(pv?' pvi':'');
if(it.t=='badge'){var b=B.concat(BC).filter(function(x){return x.id==it.k})[0];h=rose(Object.assign({},b,{on:1}))}else if(it.t=='emoji')h=it.k;else if(it.t=='tape')e.style.background=it.k;else{h='<div class="tt"></div>';if(it.t=='goal')h+='<div class="gb"><i></i></div><small>60% there</small>'}
e.innerHTML=h;var tx=e.querySelector('.tt');if(tx){tx.textContent=pv&&it.pv?it.pv:it.txt;tx.style.fontFamily=F[it.f||(it.t=='quote'?2:1)];if(it.t!='note'&&it.c)tx.style.color=it.c}
if(it.t=='note')e.style.background=it.c;return e}
function add(it){it.r=it.r||0;it.s=it.s||1;it.z=++zc;it.el=build(it);var tx=it.el.querySelector('.tt');if(tx)tx.addEventListener('blur',function(){tx.contentEditable='false';it.el.classList.remove('ed');it.txt=tx.innerText;save()});place(it);bd.appendChild(it.el);items.push(it);return it}
function by(e){return items.filter(function(i){return i.el==e})[0]}
function select(it){sel=it;items.forEach(function(i){i.el.classList.toggle('sel',i==it)});bt.classList.toggle('off',!it);if(it){it.z=++zc;place(it)}}
function edit(it){var tx=it&&it.el.querySelector('.tt');if(!tx)return;it.el.classList.add('ed');tx.contentEditable='true';tx.focus();var r=document.createRange();r.selectNodeContents(tx);var g=getSelection();g.removeAllRanges();g.addRange(r)}
function del(it){it.el.remove();items.splice(items.indexOf(it),1);select(null);save()}
function save(){clearTimeout(tm);tm=setTimeout(function(){try{localStorage.setItem('mabel-board',JSON.stringify({bg:bgi,items:items},function(key,v){return key=='el'?undefined:v}))}catch(e){}},250)}
function setbg(i){bgi=i;bd.className='board bg'+i}
function load(list){items.forEach(function(i){i.el.remove()});items=[];list.forEach(function(o){add(Object.assign({},o))});select(null)}
// tray
var th='';G.forEach(function(g,gi){th+='<h4>'+g[0]+'</h4><div class="tgp">';defs.forEach(function(d,i){if(d.g==gi){var n=NAT[d.t];th+='<div class="tr" tabindex="0" role="button" aria-label="Add '+d.t+'" data-i="'+i+'" style="width:'+Math.round(n[0]*d.ps)+'px;height:'+Math.round(n[1]*d.ps)+'px"></div>'}});th+='</div>'});tray.innerHTML=th;
tray.querySelectorAll('.tr').forEach(function(t){var d=defs[+t.dataset.i],p=build(d,true);p.style.transform='scale('+d.ps+')';t.appendChild(p)});
function free(n){var best=null,bs=1e12,cx=W/2-n[0]/2,cy=H/2-n[1]/2;for(var x=10;x<=W-n[0]-10;x+=30)for(var y=10;y<=H-n[1]-10;y+=30){var sc=0;items.forEach(function(o){var m=NAT[o.t],w=m[0]*o.s,h=m[1]*o.s,ox=o.x+m[0]/2-w/2,oy=o.y+m[1]/2-h/2;sc+=Math.max(0,Math.min(x+n[0],ox+w)-Math.max(x,ox))*Math.max(0,Math.min(y+n[1],oy+h)-Math.max(y,oy))});sc+=Math.hypot(x-cx,y-cy)*.5;if(sc<bs){bs=sc;best=[x,y]}}return best||[cx,cy]}
function drop(d,pt){var n=NAT[d.t],f=free(n),it=add(Object.assign({},d,{txt:d.txt?T(d.txt):d.txt,x:f[0],y:f[1],r:Math.round(Math.random()*8-4),s:1}));select(it);if(pt)drag={it:it,dx:n[0]/2,dy:n[1]/2};save()}
tray.addEventListener('pointerdown',function(ev){touch=ev.pointerType=='touch';var t=ev.target.closest('.tr');if(!t||touch)return;ev.preventDefault();drop(defs[+t.dataset.i],1)});
tray.addEventListener('click',function(ev){var t=ev.target.closest('.tr');if(t&&touch)drop(defs[+t.dataset.i])});
tray.addEventListener('keydown',function(ev){var t=ev.target.closest('.tr');if(t&&(ev.key=='Enter'||ev.key==' ')){ev.preventDefault();drop(defs[+t.dataset.i])}});
// board interaction
bd.addEventListener('pointerdown',function(ev){var e=ev.target.closest('.it');if(!e){select(null);return}var it=by(e);if(e.classList.contains('ed'))return;ev.preventDefault();select(it);var r=bd.getBoundingClientRect();drag={it:it,dx:(ev.clientX-r.left)/k-it.x,dy:(ev.clientY-r.top)/k-it.y}});
bd.addEventListener('dblclick',function(ev){var e=ev.target.closest('.it');if(e)edit(by(e))});
addEventListener('pointermove',function(ev){if(!drag)return;var r=bd.getBoundingClientRect();drag.it.x=(ev.clientX-r.left)/k-drag.dx;drag.it.y=(ev.clientY-r.top)/k-drag.dy;place(drag.it)});
function end(){if(!drag)return;var it=drag.it,n=NAT[it.t];it.x=Math.max(-n[0]*.4,Math.min(W-n[0]*.6,it.x));it.y=Math.max(-n[1]*.4,Math.min(H-n[1]*.6,it.y));place(it);drag=null;save()}
addEventListener('pointerup',end);addEventListener('pointercancel',end);
addEventListener('keydown',function(ev){var a=document.activeElement;if(a&&(a.isContentEditable||/INPUT|TEXTAREA/.test(a.tagName)))return;if(sel&&(ev.key=='Delete'||ev.key=='Backspace')){ev.preventDefault();del(sel)}});
// toolbar
$('cols').innerHTML=COLS.map(function(c){return '<button data-c="'+c+'" style="background:'+c+'" aria-label="Colour '+c+'"></button>'}).join('');
$('bgs').innerHTML=BGS.map(function(c,i){return '<button data-bg="'+i+'" style="background:'+c+'" aria-label="Board colour '+(i+1)+'"></button>'}).join('');
bt.addEventListener('click',function(ev){var b=ev.target.closest('button');if(!b)return;var d=b.dataset;
if(d.bg!=null){setbg(+d.bg);save();return}
if(d.a=='clr'){load([]);save();return}if(d.a=='rst'){load(seed);setbg(0);save();return}
if(!sel)return;
if(d.f){var tx=sel.el.querySelector('.tt');if(tx){sel.f=+d.f;tx.style.fontFamily=F[sel.f]}}
if(d.c){if(sel.t=='note'){sel.c=d.c;sel.el.style.background=d.c}else if(sel.t=='tape'){sel.k=d.c;sel.el.style.background=d.c}else{var t2=sel.el.querySelector('.tt');if(t2){sel.c=d.c;t2.style.color=d.c}}}
if(d.a=='sm'||d.a=='lg'){sel.s=Math.max(.4,Math.min(3.5,sel.s*(d.a=='lg'?1.12:1/1.12)))}
if(d.a=='rl')sel.r-=8;if(d.a=='rr')sel.r+=8;
if(d.a=='ed'){edit(sel);return}
if(d.a=='dup'){var c=Object.assign({},sel,{x:sel.x+26,y:sel.y+26});delete c.el;select(add(c))}
if(d.a=='del'){del(sel);return}
place(sel);save()});
// init
var saved=null;try{saved=JSON.parse(localStorage.getItem('mabel-board'))}catch(e){}
if(saved&&saved.items){setbg(saved.bg||0);load(saved.items)}else load(seed);
fit();addEventListener('resize',fit);setTimeout(fit,400)}
