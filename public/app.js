document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form?.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = Object.fromEntries(new FormData(form).entries());
  const message = [
    "Bonjour SYFA BTP, je souhaite demander un devis.",
    "",
    "Nom : " + data.name,
    "Téléphone : " + data.phone,
    "E-mail : " + data.email,
    "Type de projet : " + data.project,
    "",
    "Description du projet :",
    data.message
  ].join("\n");

  const whatsappUrl = "https://wa.me/221777863234?text=" + encodeURIComponent(message);
  status.textContent = "Ouverture de WhatsApp avec votre demande préremplie. Vérifiez le message puis appuyez sur Envoyer.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});


/* Accessible portfolio carousel */
(() => {
 const track=document.querySelector(".portfolio-track .portfolio-grid");
 const prev=document.querySelector(".portfolio-prev");
 const next=document.querySelector(".portfolio-next");
 const dots=document.querySelector(".portfolio-dots");
 if(!track||!prev||!next||!dots)return;
 const cards=[...track.children];
 let index=0;
 const perView=()=>window.matchMedia("(max-width:650px)").matches?1:window.matchMedia("(max-width:900px)").matches?2:3;
 const max=()=>Math.max(0,cards.length-perView());
 const render=()=>{
   index=Math.min(index,max());
   const card=cards[0];
   const gap=parseFloat(getComputedStyle(track).gap)||18;
   const step=card.getBoundingClientRect().width+gap;
   track.style.transform="translateX("+(-index*step)+"px)";
   [...dots.children].forEach((dot,i)=>dot.setAttribute("aria-current",String(i===index)));
   prev.disabled=index===0;next.disabled=index===max();
 };
 const pages=()=>max()+1;
 const buildDots=()=>{
   dots.replaceChildren();
   for(let i=0;i<pages();i++){
     const b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Afficher la réalisation "+(i+1));
     b.addEventListener("click",()=>{index=i;render()});dots.append(b);
   }
 };
 prev.addEventListener("click",()=>{index=Math.max(0,index-1);render()});
 next.addEventListener("click",()=>{index=Math.min(max(),index+1);render()});
 let resizeTimer;
 window.addEventListener("resize",()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{buildDots();render()},120)});
 buildDots();render();
})();
