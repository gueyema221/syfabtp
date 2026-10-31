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
  const subject = encodeURIComponent("Demande de devis SYFA BTP — " + data.project);
  const body = encodeURIComponent(
    "Bonjour SYFA BTP,\n\nJe souhaite vous contacter au sujet de mon projet.\n\n" +
    "Nom : " + data.name + "\nTéléphone : " + data.phone +
    "\nE-mail : " + data.email + "\nType de projet : " + data.project +
    "\n\nDescription :\n" + data.message + "\n\nCordialement,\n" + data.name
  );
  status.textContent = "Ouverture de votre application e-mail…";
  window.location.href = "mailto:magueyegib1@gmail.com?subject=" + subject + "&body=" + body;
});