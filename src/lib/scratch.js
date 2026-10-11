import {spark} from './badges.js';
const $=id=>document.getElementById(id);
// scratch card
export function initScratch(onScratch,chill){var c=$('sc'),b=$('qb'),x,w,h,on=0,done=0,n=0;
function init(){var r=b.getBoundingClientRect();w=c.width=r.width;h=c.height=r.height;x=c.getContext('2d');var g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#d7b8c7');g.addColorStop(.5,'#f6e6f0');g.addColorStop(1,'#c7c3ff');x.fillStyle=g;x.fillRect(0,0,w,h);
for(var i=0;i<700;i++){x.fillStyle=['#fff','#FFB3A7','#C7C3FF','#fff6c9'][i%4];x.globalAlpha=Math.random()*.9;var z=Math.random()*3+1;x.fillRect(Math.random()*w,Math.random()*h,z,z)}x.globalAlpha=1;
x.fillStyle='#1f1f1f';x.textAlign='center';x.font='700 '+Math.min(54,w/9)+'px Caveat,cursive';x.fillText((chill?'scratch kar ✦ lottery wali feel':'scratch me ✦ it\'s giving lottery'),w/2,h/2-6);x.font='500 15px Plus Jakarta Sans,sans-serif';x.fillText('(your daily dose of discipline is underneath)',w/2,h/2+28)}
setTimeout(init,600);
function sc(e){if(!on||done)return;var r=c.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;x.globalCompositeOperation='destination-out';x.beginPath();x.arc(px,py,30,0,7);x.fill();x.globalCompositeOperation='source-over';spark(e.clientX+Math.random()*30-15,e.clientY+Math.random()*30-15);
if(++n%14==0){var d=x.getImageData(0,0,w,h).data,k=0,t=0;for(var i=3;i<d.length;i+=64){t++;if(d[i]<80)k++}if(k/t>.45){done=1;c.style.opacity=0;c.style.pointerEvents='none';for(var j=0;j<30;j++)setTimeout(function(){spark(Math.random()*innerWidth,Math.random()*innerHeight*.8)},j*40);onScratch()}}}
c.addEventListener('pointerdown',function(e){on=1;c.setPointerCapture(e.pointerId);sc(e)});c.addEventListener('pointermove',sc);addEventListener('pointerup',function(){on=0})}
