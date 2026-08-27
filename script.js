const progress = document.querySelector(".progress");
const glow = document.querySelector(".cursor-glow");

function updateProgress(){
  const root = document.documentElement;
  const max = root.scrollHeight - root.clientHeight;
  progress.style.width = `${max ? (root.scrollTop / max) * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08});
document.querySelectorAll(".reveal").forEach((el)=>observer.observe(el));

window.addEventListener("pointermove",(event)=>{
  if(!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
},{passive:true});

document.querySelectorAll("a[href^='#']").forEach((link)=>{
  link.addEventListener("click",(event)=>{
    const target = document.querySelector(link.getAttribute("href"));
    if(target){
      event.preventDefault();
      target.scrollIntoView({behavior:"smooth",block:"start"});
    }
  });
});
