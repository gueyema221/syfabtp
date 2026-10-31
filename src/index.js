function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({ ok: true, service: "SYFA BTP API" });
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      if (!env.DB) return json({ ok: false, error: "Base de données non configurée." }, 503);

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ ok: false, error: "Corps JSON invalide." }, 400);
      }

      // Champ anti-spam : les visiteurs normaux doivent le laisser vide.
      if (body.website) return json({ ok: true });

      const name = String(body.name || "").trim().slice(0, 120);
      const email = String(body.email || "").trim().slice(0, 180);
      const phone = String(body.phone || "").trim().slice(0, 40);
      const message = String(body.message || "").trim().slice(0, 5000);

      if (!name || !email || !message || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        return json({ ok: false, error: "Nom, e-mail valide et message sont obligatoires." }, 400);
      }

      await env.DB.prepare(
        "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)"
      ).bind(name, email, phone, message).run();

      return json({ ok: true, message: "Demande reçue." }, 201);
    }

    return env.ASSETS.fetch(request);
  }
};