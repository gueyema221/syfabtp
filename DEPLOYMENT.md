# Déploiement SYFA BTP — GitHub + Cloudflare

## Architecture
- Site statique dans `public/`
- API Cloudflare Worker dans `src/index.js`
- Stockage des demandes de devis via Cloudflare D1
- Configuration Wrangler dans `wrangler.jsonc`

## Étape 1 — Connecter le dépôt à Cloudflare
1. Ouvrir https://dash.cloudflare.com/
2. Aller dans Workers & Pages.
3. Choisir Create application / Import a repository.
4. Connecter GitHub et sélectionner `gueyema221/syfabtp`.
5. Choisir le déploiement Worker avec configuration Wrangler depuis le dépôt.
6. Définir la commande de build si l'interface l'exige : `npm install`.
7. Déployer une première fois après avoir configuré l'identifiant D1.

## Étape 2 — Créer D1
Depuis un terminal sur le dépôt :
```bash
npm install
npx wrangler login
npx wrangler d1 create syfabtp-db
```
Copier le `database_id` fourni dans `wrangler.jsonc`, à la place de `REMPLACER_PAR_LE_DATABASE_ID`.

Appliquer la migration :
```bash
npm run db:migrate:remote
```

## Étape 3 — Déploiement
```bash
npm run deploy
```

## Étape 4 — Domaine personnalisé
Une fois le domaine `syfabtp.com` enregistré et ajouté à Cloudflare :
1. Ouvrir le Worker `syfabtp-site`.
2. Aller dans Settings / Domains & Routes.
3. Ajouter `syfabtp.com` et `www.syfabtp.com`.
4. Suivre la configuration DNS indiquée par Cloudflare.
5. Choisir une seule adresse canonique et rediriger l'autre.

## Étape 5 — Vérifications
- `https://syfabtp.com/` affiche le site.
- `https://syfabtp.com/api/health` retourne `{"ok":true,"service":"SYFA BTP API"}`.
- Envoyer un formulaire de contact et vérifier l'enregistrement dans D1.

## Sécurité et mise en production
- Ne jamais déposer de jeton, mot de passe ou clé secrète dans le dépôt.
- Activer une protection anti-spam, par exemple Cloudflare Turnstile, et une limite de débit avant de publier le formulaire.
- Ajouter politique de confidentialité et information sur le traitement des données personnelles.
- Prévoir sauvegardes D1 et procédure de restauration.
- Le formulaire enregistre les messages en D1, mais n'envoie pas automatiquement de notification e-mail.
- Les quotas gratuits et conditions Cloudflare peuvent évoluer : les vérifier avant mise en production.
- Le dépôt contient un socle technique à personnaliser avec les vraies coordonnées, réalisations, photos et informations légales de SYFA BTP.
