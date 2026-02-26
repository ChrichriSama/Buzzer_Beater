# 04 — Référence API REST

Tous les endpoints exposés par le serveur Express sur `http://localhost:3000`.

## Sommaire
- [Authentification (`/api/users`)](#authentification-apiusers)
- [Pins carte (`/api/pins`)](#pins-carte-apipins)
- [Forum (`/api/forum`)](#forum-apiforum)
- [Tester l'API avec curl](#tester-lapi-avec-curl)
- [Codes de réponse HTTP](#codes-de-réponse-http)

---

## Authentification `/api/users`

### `POST /api/users/register` — Créer un compte

**Body (JSON) :**
```json
{
  "username": "chris",
  "email": "chris@example.com",
  "password": "monMotDePasse123"
}
```

**Réponse succès `200` :**
```json
"64a1b2c3d4e5f6789012345a"
```
*(L'`_id` du nouvel utilisateur)*

**Réponse erreur `500` :**
```json
{ "code": 11000, "keyValue": { "username": "chris" } }
```
*(Username ou email déjà utilisé — erreur de clé dupliquée MongoDB)*

---

### `POST /api/users/login` — Se connecter

**Body (JSON) :**
```json
{
  "username": "chris",
  "password": "monMotDePasse123"
}
```

**Réponse succès `200` :**
```json
{
  "_id": "64a1b2c3d4e5f6789012345a",
  "username": "chris"
}
```

**Réponse erreur `400` :**
```json
"Wrong username/Password"
```

---

## Pins carte `/api/pins`

### `GET /api/pins` — Récupérer tous les pins

Pas de body requis.

**Réponse succès `200` :**
```json
[
  {
    "_id": "64a1b2...",
    "username": "chris",
    "title": "Terrain République",
    "desc": "Super terrain",
    "rating": 5,
    "lat": 48.8671,
    "long": 2.3635,
    "createdAt": "2025-01-20T10:00:00.000Z",
    "updatedAt": "2025-01-20T10:00:00.000Z"
  },
  ...
]
```

---

### `POST /api/pins` — Créer un pin

> Requiert d'être connecté — le `username` est passé dans le body depuis le front.

**Body (JSON) :**
```json
{
  "username": "chris",
  "title": "Terrain Bastille",
  "desc": "Petit terrain 3x3",
  "rating": 4,
  "lat": 48.8533,
  "long": 2.3692
}
```

**Réponse succès `200` :**
```json
{
  "_id": "64a1b2c3...",
  "username": "chris",
  "title": "Terrain Bastille",
  "desc": "Petit terrain 3x3",
  "rating": 4,
  "lat": 48.8533,
  "long": 2.3692,
  "createdAt": "2025-01-20T12:00:00.000Z",
  "updatedAt": "2025-01-20T12:00:00.000Z",
  "__v": 0
}
```

---

## Forum `/api/forum`

### `GET /api/forum/posts` — Récupérer tous les posts

Pas de body. Retourne les posts du plus récent au plus ancien.

**Réponse succès `200` :**
```json
[
  {
    "_id": "64a1b2...",
    "username": "yannis",
    "title": "Meilleur joueur 2025 ?",
    "content": "Pour moi c'est Wembanyama",
    "replies": [
      {
        "_id": "64a1b3...",
        "username": "chris",
        "content": "Je suis d'accord !",
        "createdAt": "2025-01-21T09:15:00.000Z"
      }
    ],
    "createdAt": "2025-01-21T08:00:00.000Z"
  }
]
```

---

### `POST /api/forum/posts` — Créer un post

**Body (JSON) :**
```json
{
  "username": "chris",
  "title": "Les meilleurs terrains de Paris",
  "content": "Je vous partage ma liste des terrains incontournables..."
}
```

**Réponse succès `200` :** Le post créé (objet complet avec `_id`, `replies: []`, `createdAt`…)

**Réponse erreur `400` :**
```json
"username, title et content sont requis"
```

---

### `POST /api/forum/posts/:id/reply` — Répondre à un post

**URL :** `/api/forum/posts/64a1b2c3d4e5f6789012345c/reply`

**Body (JSON) :**
```json
{
  "username": "chris",
  "content": "Super post, merci !"
}
```

**Réponse succès `200` :** Le post complet mis à jour (avec la nouvelle réponse dans `replies`)

**Réponse erreur `404` :**
```json
"Post introuvable"
```

---

### `DELETE /api/forum/posts/:id` — Supprimer un post

> Seul l'auteur peut supprimer son post. Le `username` doit correspondre.

**URL :** `/api/forum/posts/64a1b2c3d4e5f6789012345c`

**Body (JSON) :**
```json
{
  "username": "chris"
}
```

**Réponse succès `200` :**
```json
"Post supprimé"
```

**Réponse erreur `403` :**
```json
"Non autorisé"
```

---

## Tester l'API avec curl

Ces commandes fonctionnent dans un terminal (PowerShell ou bash).

```bash
# Créer un compte
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'

# Se connecter
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'

# Récupérer tous les pins
curl http://localhost:3000/api/pins

# Créer un pin
curl -X POST http://localhost:3000/api/pins \
  -H "Content-Type: application/json" \
  -d '{"username":"test","title":"Terrain Test","desc":"Top","rating":5,"lat":48.85,"long":2.35}'

# Récupérer tous les posts du forum
curl http://localhost:3000/api/forum/posts

# Créer un post
curl -X POST http://localhost:3000/api/forum/posts \
  -H "Content-Type: application/json" \
  -d '{"username":"test","title":"Mon premier post","content":"Bonjour tout le monde !"}'
```

**Avec PowerShell :**
```powershell
# Récupérer tous les pins
Invoke-RestMethod -Uri "http://localhost:3000/api/pins" -Method GET

# Se connecter
Invoke-RestMethod -Uri "http://localhost:3000/api/users/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"username":"test","password":"123456"}'
```

---

## Codes de réponse HTTP

| Code | Signification | Quand ? |
|------|--------------|---------|
| `200` | OK | Requête réussie |
| `400` | Bad Request | Données invalides (mauvais mot de passe, champs manquants…) |
| `403` | Forbidden | Action non autorisée (supprimer le post de quelqu'un d'autre) |
| `404` | Not Found | Document introuvable en base |
| `500` | Server Error | Erreur inattendue (bug, MongoDB down…) |
