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

