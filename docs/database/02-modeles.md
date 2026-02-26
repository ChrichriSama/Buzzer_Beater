# 02 — Les modèles de données

## Sommaire
1. [C'est quoi un modèle Mongoose ?](#cest-quoi-un-modèle-mongoose)
2. [Modèle User](#modèle-user)
3. [Modèle Pin](#modèle-pin)
4. [Modèle Post (Forum)](#modèle-post-forum)
5. [Le champ `timestamps`](#le-champ-timestamps)
6. [Valider les données](#valider-les-données)

---

## C'est quoi un modèle Mongoose ?

Un **modèle** Mongoose = un schéma JavaScript qui décrit la forme d'un document MongoDB.

```
Schéma JS  →  Modèle Mongoose  →  Collection MongoDB
UserSchema →  User             →  collection "users"
```

Chaque modèle expose des méthodes pour lire/écrire en base :
`User.find()`, `User.findById()`, `new User({...}).save()`, etc.

---

## Modèle User

**Fichier :** `models/User.js`

```js
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,   // champ obligatoire
        min: 3,          // longueur minimum
        max: 20,         // longueur maximum
        unique: true,    // pas de doublons
    },
    email: {
        type: String,
        require: true,
        max: 60,
        unique: true     // un email = un compte
    },
    password: {
        type: String,
        require: true,
        min: 6,          // hash bcrypt (60+ caractères en pratique)
    },
}, { timestamps: true });
```

**Document exemple en base :**
```json
{
  "_id": "64a1b2c3d4e5f6789012345a",
  "username": "chris",
  "email": "chris@example.com",
  "password": "$2b$10$xK9...hashed...",
  "createdAt": "2025-01-15T14:30:00.000Z",
  "updatedAt": "2025-01-15T14:30:00.000Z",
  "__v": 0
}
```

> Le mot de passe est **toujours hashé** avec bcryptjs avant d'être stocké — le mot de passe en clair n'est jamais sauvegardé.

**Champs importants :**
| Champ | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Identifiant unique généré automatiquement par MongoDB |
| `username` | String | Pseudo unique (3–20 caractères) |
| `email` | String | Email unique |
| `password` | String | Hash bcrypt du mot de passe |
| `createdAt` | Date | Date de création (auto) |
| `updatedAt` | Date | Date de dernière modification (auto) |

---

## Modèle Pin

**Fichier :** `models/Pin.js`

```js
const PinSchema = new mongoose.Schema({
    username: { type: String, require: true },  // auteur du pin
    title:    { type: String, require: true },  // nom du lieu
    desc:     { type: String, require: true },  // description / avis
    rating:   { type: Number, require: true, min: 0, max: 5 }, // note
    lat:      { type: Number, require: true },  // latitude GPS
    long:     { type: Number, require: true },  // longitude GPS
}, { timestamps: true });
```

**Document exemple en base :**
```json
{
  "_id": "64a1b2c3d4e5f6789012345b",
  "username": "chris",
  "title": "Terrain Denfert",
  "desc": "Super terrain, panneaux en bon état",
  "rating": 4,
  "lat": 48.8336,
  "long": 2.3325,
  "createdAt": "2025-01-20T10:00:00.000Z",
  "updatedAt": "2025-01-20T10:00:00.000Z",
  "__v": 0
}
```

**Champs importants :**
| Champ | Type | Description |
|-------|------|-------------|
| `username` | String | Qui a créé ce pin |
| `title` | String | Nom affiché dans le popup de la carte |
| `desc` | String | Texte de l'avis |
| `rating` | Number | Note entre 0 et 5 |
| `lat` | Number | Latitude (ex: `48.858`) |
| `long` | Number | Longitude (ex: `2.294`) |

**Sur la carte :**
- Pin **rouge** = créé par l'utilisateur connecté (`p.username === currentUser`)
- Pin **bleu** = créé par quelqu'un d'autre

---

## Modèle Post (Forum)

**Fichier :** `models/Post.js`

Ce modèle est plus complexe car il contient un **sous-schéma imbriqué** pour les réponses.

```js
// Schéma d'une réponse (subdocument)
const ReplySchema = new mongoose.Schema({
    username: { type: String, required: true },
    content:  { type: String, required: true },
}, { timestamps: true });

// Schéma d'un post (document principal)
const PostSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title:    { type: String, required: true, maxlength: 150 },
    content:  { type: String, required: true },
    replies:  [ReplySchema],   // tableau de réponses imbriquées
}, { timestamps: true });
```

**Document exemple en base :**
```json
{
  "_id": "64a1b2c3d4e5f6789012345c",
  "username": "yannis",
  "title": "Meilleur joueur NBA 2025 ?",
  "content": "Pour moi c'est clairement Wembanyama qui domine cette saison.",
  "replies": [
    {
      "_id": "64a1b2c3d4e5f6789012345d",
      "username": "chris",
      "content": "Je suis d'accord, ses stats sont incroyables !",
      "createdAt": "2025-01-21T09:15:00.000Z",
      "updatedAt": "2025-01-21T09:15:00.000Z"
    },
    {
      "_id": "64a1b2c3d4e5f6789012345e",
      "username": "loey",
      "content": "SGA > tout le monde cette année",
      "createdAt": "2025-01-21T11:30:00.000Z",
      "updatedAt": "2025-01-21T11:30:00.000Z"
    }
  ],
  "createdAt": "2025-01-21T08:00:00.000Z",
  "updatedAt": "2025-01-21T11:30:00.000Z",
  "__v": 2
}
```

**Architecture imbriquée :**
```
Post (document)
├── _id, username, title, content
└── replies[] (tableau de subdocuments)
    ├── reply._id, reply.username, reply.content
    └── reply.createdAt, reply.updatedAt
```

> Les réponses sont **stockées dans le même document** que le post. Pas besoin d'une requête séparée pour les récupérer.

---

## Le champ `timestamps`

L'option `{ timestamps: true }` ajoute automatiquement **deux champs** à chaque document :

| Champ | Type | Quand ? |
|-------|------|---------|
| `createdAt` | Date | À la création du document |
| `updatedAt` | Date | À chaque modification du document |

```js
// Mongoose gère ces champs tout seul
const post = new Post({ username: 'chris', title: '...', content: '...' });
await post.save();
// post.createdAt → Date.now()
// post.updatedAt → Date.now()

post.content = 'Modifié';
await post.save();
// post.updatedAt → nouvelle date
// post.createdAt → inchangé
```

---

## Valider les données

Mongoose valide automatiquement les champs avant de sauvegarder.

```js
// Exemple : créer un User sans email (champ required)
const user = new User({ username: 'test', password: '123456' });
try {
    await user.save();
} catch (err) {
    console.log(err.errors.email.message);
    // → "Path `email` is required."
}
```

**Validators disponibles :**

| Validator | Types | Exemple |
|-----------|-------|---------|
| `required` | tous | `{ required: true }` |
| `min` / `max` | Number | `{ min: 0, max: 5 }` |
| `minlength` / `maxlength` | String | `{ maxlength: 150 }` |
| `unique` | tous | `{ unique: true }` (index) |
| `enum` | String | `{ enum: ['admin', 'user'] }` |
| `match` | String | `{ match: /^[a-z]+$/ }` |

> `unique: true` crée un **index unique** en base. Si tu insères deux documents avec le même `username`, MongoDB retourne une erreur `E11000 duplicate key`.
