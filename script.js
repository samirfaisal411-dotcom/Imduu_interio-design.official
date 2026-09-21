const header=document.getElementById("header");
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>40));

const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

let counted=false;
const stats=document.querySelector(".stats");
const statObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!counted){
    counted=true;
    document.querySelectorAll("[data-count]").forEach(el=>{
      const target=+el.dataset.count; let n=0; const step=Math.max(1,Math.ceil(target/45));
      const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n+"+";if(n>=target)clearInterval(timer)},28);
    });
  }
},{threshold:.4});
statObserver.observe(stats);

document.getElementById("achievementUpload").addEventListener("change",e=>{
  const file=e.target.files[0]; if(!file)return;
  const url=URL.createObjectURL(file);
  document.getElementById("achievementPreview").style.background=`url("${url}") center/cover`;
  document.getElementById("achievementPreview").innerHTML="";
});

window.addEventListener("load",()=>setTimeout(()=>document.getElementById("preloader").style.display="none",450));
