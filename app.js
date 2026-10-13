const HUES=["#7C3AED","#EC4899","#0EA5E9","#F59E0B","#10B981","#EF4444","#5EEAD4"];
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
function surprise(){const h=HUES[Math.floor(Math.random()*HUES.length)];document.documentElement.style.setProperty('--accent',h);code()}
function code(){const cs=getComputedStyle(document.documentElement);const el=$('#code');if(el)el.textContent=`--accent: ${cs.getPropertyValue('--accent').trim()};  --type: ${(cs.getPropertyValue('--type')||'1').trim()};  --gap: ${cs.getPropertyValue('--gap').trim()};  --radius: ${cs.getPropertyValue('--radius').trim()};`}
function cycleType(){const r=document.documentElement.style;const v=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--type'))||1;const n=v>=1.2?0.9:+(v+0.1).toFixed(2);r.setProperty('--type',n);code()}
function cycleGap(){const r=document.documentElement.style;const v=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'))||22;const n=v>=36?12:v+8;r.setProperty('--gap',n+'px');code()}
function cycleRadius(){const r=document.documentElement.style;const v=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--radius'))||20;const n=v>=32?8:v+8;r.setProperty('--radius',n+'px');code()}
function resetAll(){const r=document.documentElement.style;r.setProperty('--accent','#7C3AED');r.setProperty('--type',1);r.setProperty('--gap','22px');r.setProperty('--radius','20px');code()}
/* toast */
function toast(msg){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),1600)}
async function copyEmail(){try{await navigator.clipboard.writeText("ststudiosng@gmail.com")}catch{};toast("Email copied — ststudiosng@gmail.com");$$('#copyBtn,#copyTop').forEach(b=>{const o=b.dataset.o||b.textContent;b.dataset.o=o;b.textContent="copied ✓";setTimeout(()=>b.textContent=o,1500)})}
/* ---------- core: loader, progress, reveal (always on) ---------- */
(function(){
  const loader=$('#loader'),num=$('#loadN'),fill=$('#loadF');
  if(loader){
    let n=0;
    if(num&&/^\d/.test(num.textContent.trim())){const t=setInterval(()=>{n+=Math.ceil(Math.random()*13);if(n>=100){n=100;clearInterval(t);setTimeout(()=>loader.classList.add('done'),300);setTimeout(()=>loader.remove(),1100)}num.innerHTML=n+'<span style="font-size:24px">%</span>';if(fill)fill.style.width=n+'%'},110)}
    else{setTimeout(()=>loader.classList.add('done'),15000);setTimeout(()=>loader.remove(),15800)}
  }
  const bar=$('#bar');
  addEventListener('scroll',()=>{const h=document.documentElement;const p=h.scrollTop/((h.scrollHeight-h.clientHeight)||1);if(bar)bar.style.transform=`scaleX(${p})`},{passive:true});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{threshold:.1,rootMargin:"0px 0px -6% 0px"});
  window.__reveal=(sel=".rv,.card,.pgrid img,.sol,.testi")=>{ $$(sel).forEach(el=>io.observe(el)) };
  document.addEventListener('DOMContentLoaded',()=>{window.__reveal();splitHero();counters();tiltCards();magnetic();parallaxBlobs();pageFade();lightboxInit();marqueeInit()});
  setTimeout(()=>{window.__reveal();splitHero();counters();tiltCards();magnetic();marqueeInit()},700);
})();
/* ---------- hero headline split ---------- */
let heroDone=false;
function splitHero(){
  if(heroDone)return;heroDone=true;
  $$('.hero-h').forEach(h=>{
    if(h.dataset.split)return;h.dataset.split="1";
    const nodes=[...h.childNodes];h.innerHTML="";
    nodes.forEach(node=>{
      if(node.nodeName==="BR"){h.appendChild(document.createElement("br"));return}
      const text=node.textContent;const em=node.nodeName==="EM";
      text.split("").forEach((ch,i)=>{
        if(ch===" "){h.appendChild(document.createTextNode(" ")) ;return}
        const s=document.createElement('span');s.className='hl'+(em?' hle':'');s.textContent=ch;
        s.style.animationDelay=(Math.random()*0.5+[...h.querySelectorAll('.hl')].length*0.028)+'s';
        s.onmouseenter=()=>{s.style.color='var(--accent)';s.style.transform='translateY(-10px) rotate(5deg) scale(1.12)';setTimeout(()=>{s.style.color='';s.style.transform=''},450);if(Math.random()<.25)surprise()};
        h.appendChild(s);
      });
    });
  });
}
/* ---------- animated counters ---------- */
function counters(){
  $$('.hstat-n').forEach(el=>{
    if(el.dataset.c)return;el.dataset.c="1";
    const raw=el.textContent.trim(),num=parseInt(raw)||0,suf=raw.replace(/[0-9]/g,'')||"";
    const t0=performance.now(),dur=1400;
    (function tick(t){const p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(num*e)+suf;if(p<1)requestAnimationFrame(tick)})(t0);
  });
}
/* ---------- 3D tilt + glare + ripple cards ---------- */
function tiltCards(){
  if(matchMedia('(hover: none)').matches)return;
  $$('.card,.portal').forEach(card=>{
    if(card.dataset.tilt)return;card.dataset.tilt="1";
    card.style.transformStyle="preserve-3d";
    const glare=document.createElement('span');glare.className='glare';card.appendChild(glare);
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
      card.style.transform=`translateY(-8px) perspective(900px) rotateX(${((0.5-py)*10).toFixed(2)}deg) rotateY(${((px-0.5)*12).toFixed(2)}deg) scale(1.02)`;
      glare.style.opacity="1";glare.style.background=`radial-gradient(500px circle at ${px*100}% ${py*100}%, rgba(255,255,255,.16), transparent 60%)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';glare.style.opacity="0"});
    card.addEventListener('click',e=>{
      const r=card.getBoundingClientRect(),d=document.createElement('span');d.className='ripple';
      const s=Math.max(r.width,r.height);d.style.width=d.style.height=s+'px';
      d.style.left=(e.clientX-r.left-s/2)+'px';d.style.top=(e.clientY-r.top-s/2)+'px';
      card.appendChild(d);setTimeout(()=>d.remove(),700);
    });
  });
}
/* ---------- magnetic buttons ---------- */
function magnetic(){
  if(matchMedia('(hover: none)').matches)return;
  $$('.btn,.copy,.mailbig,.tool').forEach(b=>{
    if(b.dataset.m)return;b.dataset.m="1";
    b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px) scale(1.05)`});
    b.addEventListener('mouseleave',()=>b.style.transform='');
  });
}
/* ---------- hero blob parallax ---------- */
function parallaxBlobs(){
  addEventListener('mousemove',e=>{
    const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);
    $$('.blob').forEach((b,i)=>{b.style.translate=`${x*(i? -46:60)}px ${y*(i? -34:44)}px`});
  },{passive:true});
}
/* ---------- page fade transitions ---------- */
function pageFade(){
  document.body.style.animation="pagein .55s cubic-bezier(.22,1,.36,1)";
  $$('a[href$=".html"],a[href^="project.html"],a[href^="work.html"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const h=a.getAttribute('href');if(!h||h.startsWith('mailto')||h.startsWith('http')||e.metaKey)return;
      e.preventDefault();document.body.style.opacity="0";document.body.style.transition="opacity .25s";
      setTimeout(()=>location.href=h,240);
    });
  });
}
/* ---------- marquee builder ---------- */
function marqueeInit(){
  const m=$('#mtrack');if(m&&!m.textContent&&window.PROJECTS)m.textContent=(PROJECTS.map(p=>p.t).join("  ✦  ")+"  ✦  ").repeat(2);
}
/* ---------- fullscreen lightbox zoom (project pages) ---------- */
function lightboxInit(){
  let lb=$('#zoom');if(!lb){lb=document.createElement('div');lb.id='zoom';lb.innerHTML='<img/><span>✕ · esc · ←/→</span>';document.body.appendChild(lb);
    lb.addEventListener('click',()=>lb.classList.remove('open'));
    addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;const imgs=$$('.pgrid img');let i=imgs.indexOf(lb._cur);
      if(e.key==='Escape')lb.classList.remove('open');
      if(e.key==='ArrowRight'){i=(i+1)%imgs.length;show(imgs[i])}
      if(e.key==='ArrowLeft'){i=(i-1+imgs.length)%imgs.length;show(imgs[i])}});
    function show(im){lb._cur=im;lb.querySelector('img').src=im.src}
    lb._show=show;
  }
  $$('.pgrid img,.pcover').forEach(im=>{if(im.dataset.z)return;im.dataset.z="1";im.style.cursor="zoom-in";im.addEventListener('click',()=>{lb._show(im);lb.classList.add('open')})});
}
/* project keyboard prev/next */
(function(){
  const m=location.pathname.match(/project\.html/);if(!m||!window.PROJECTS)return;
  addEventListener('keydown',e=>{
    if($('#zoom')?.classList.contains('open'))return;
    const id=new URLSearchParams(location.search).get('id');
    const i=PROJECTS.findIndex(x=>x.id===id);if(i<0)return;
    if(e.key==='ArrowRight')location.href="project.html?id="+PROJECTS[(i+1)%PROJECTS.length].id;
    if(e.key==='ArrowLeft')location.href="project.html?id="+PROJECTS[(i-1+PROJECTS.length)%PROJECTS.length].id;
  });
})();
function heroLetters(elId,first,second){
  const el=document.getElementById(elId);if(!el)return;el.innerHTML="";
  const mk=(word,stroke)=>{const div=document.createElement('div');div.style.width="100%";word.split("").forEach((ch,i)=>{const s=document.createElement('span');s.className='letter'+(stroke?' stroke':'');s.textContent=ch;s.style.animationDelay=(i*0.045)+'s';if(!stroke&&i%3===0)s.style.color='var(--accent)';s.onmouseenter=surprise;div.appendChild(s)});el.appendChild(div)};
  mk(first,false);if(second)mk(second,true);
}
