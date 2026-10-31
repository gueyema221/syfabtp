document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "Envoi en cours…";
  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Échec de l'envoi.");
    status.textContent = "Votre demande a été envoyée.";
    form.reset();
  } catch (error) {
    status.textContent = error.message || "Une erreur est survenue.";
  }
});