const loader=document.getElementById("loader");window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),650));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const menu=document.getElementById("menu");
menu?.addEventListener("click",()=>document.querySelector(".nav nav")?.classList.toggle("mobile-open"));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav nav")?.classList.remove("mobile-open")));

const githubStatus=document.getElementById("github-status");
fetch("https://api.github.com/users/wsl-iq/repos?sort=updated&per_page=6")
.then(r=>{if(!r.ok)throw new Error("GitHub API");return r.json()})
.then(repos=>{
  const valid=repos.filter(r=>!r.fork);
  githubStatus.textContent=`آخر تحديثات GitHub: ${valid.slice(0,3).map(r=>r.name).join("  ·  ")}  /  ${valid.length}+ مستودعات حديثة`;
})
.catch(()=>githubStatus.textContent="GitHub / wsl-iq — استكشف المستودعات والمشاريع المفتوحة");

const terminal=document.getElementById("terminal");
let commands=["whoami","role","stack","status"];
let idx=0;
setInterval(()=>{
  const caret=terminal?.querySelector(".terminal-caret");
  if(caret)caret.style.opacity=caret.style.opacity==="0"?"1":"0";
},700);

document.addEventListener("keydown",e=>{
  if(e.key.toLowerCase()==="g"&&!e.ctrlKey&&!e.altKey){
    const active=document.activeElement;
    if(active?.tagName!=="INPUT"&&active?.tagName!=="TEXTAREA"){
      document.getElementById("projects")?.scrollIntoView({behavior:"smooth"});
    }
  }
});

window.addEventListener("scroll",()=>{
  document.documentElement.style.setProperty("--scroll",window.scrollY);
});
