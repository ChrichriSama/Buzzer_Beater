# 01 — Connexion à MongoDB

## Sommaire
1. [Comment fonctionne la connexion](#comment-fonctionne-la-connexion)
2. [Le fichier `.env`](#le-fichier-env)
3. [Obtenir une URL MongoDB Atlas](#obtenir-une-url-mongodb-atlas)
4. [Tester la connexion](#tester-la-connexion)
5. [Erreurs courantes](#erreurs-courantes)

---

## Comment fonctionne la connexion

Dans `index.js`, la connexion se fait en **2 lignes** :

```js
// index.js
dotenv.config();   // charge les variables du fichier .env

mongoose.connect(process.env.Mongo_Url)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("Erreur connexion:", err));
```

`process.env.Mongo_Url` est lu depuis le fichier `.env` dans le dossier `backend_map/`.

**Flux complet :**
```
.env (secret)
   ↓
dotenv.config()
   ↓
mongoose.connect(url)
   ↓
MongoDB Atlas (cloud) ou MongoDB local
   ↓
Collections : users / pins / posts
```

---

## Le fichier `.env`

Le fichier `.env` doit être créé manuellement dans `map_bb/backend_map/` :

```
map_bb/backend_map/.env
```

**Contenu minimal :**
```env
Mongo_Url=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/buzzerbeater?retryWrites=true&w=majority
```

> Ce fichier est listé dans `.gitignore` — il ne doit **jamais** être commité (il contient le mot de passe de la base).

**Structure de l'URL MongoDB Atlas :**
```
mongodb+srv://
  USERNAME        ← ton identifiant Atlas
  :PASSWORD       ← ton mot de passe Atlas
  @cluster.mongodb.net
  /buzzerbeater   ← nom de la base de données
  ?retryWrites=true&w=majority
```

---

## Obtenir une URL MongoDB Atlas

### Étape 1 — Créer un compte
1. Va sur [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Crée un compte gratuit
3. Crée un projet et un cluster (choisir **M0 Free**)

### Étape 2 — Créer un utilisateur de base
1. Menu gauche → **Database Access**
2. **Add New Database User**
3. Méthode : Password
4. Note le username et password — tu en auras besoin dans l'URL

### Étape 3 — Autoriser ton IP
1. Menu gauche → **Network Access**
2. **Add IP Address** → `0.0.0.0/0` (autorise toutes les IPs, pratique en dev)

### Étape 4 — Récupérer l'URL
1. Menu gauche → **Database** → **Connect**
2. Choisis **Compass** ou **Drivers**
3. Sélectionne **Node.js**
4. Copie l'URL de connexion et remplace `<password>` par ton mot de passe

---

## Tester la connexion

### Avec Node.js directement
Crée un fichier `test-connexion.js` dans `backend_map/` :

```js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.Mongo_Url)
  .then(() => {
    console.log('Connexion réussie !');
    console.log('Base de données :', mongoose.connection.name);
    mongoose.disconnect();
  })
  .catch(err => console.error('Échec :', err.message));
```

```bash
node test-connexion.js
# → Connexion réussie !
# → Base de données : buzzerbeater
```

### Avec le serveur complet
```bash
node index.js
# → MongoDB connected!
# → Backend server is running!
```

---

## Erreurs courantes

### `MongoServerError: bad auth`
Le mot de passe dans l'URL est incorrect.
- Vérifie que les caractères spéciaux sont encodés (ex: `@` → `%40`)
- Recrée l'utilisateur dans Atlas si nécessaire

### `MongoNetworkError: connection timed out`
Ton IP n'est pas autorisée dans Atlas.
- Aller dans **Network Access** → ajouter `0.0.0.0/0`

### `Error: Cannot find module 'dotenv'`
```bash
npm install dotenv
```

### `Mongo_Url is undefined`
Le fichier `.env` n'existe pas ou n'est pas dans le bon dossier.
- Vérifie que `.env` est dans `map_bb/backend_map/`
- Vérifie que `dotenv.config()` est appelé **avant** `mongoose.connect()`

### `MongooseError: Can't call openUri() after connection was opened`
Mongoose essaie de se connecter deux fois.
- N'appelle `mongoose.connect()` qu'une seule fois dans `index.js`

---

## États de la connexion Mongoose

Mongoose expose l'état de connexion via `mongoose.connection.readyState` :

| Valeur | État |
|--------|------|
| `0` | Déconnecté |
| `1` | Connecté |
| `2` | En cours de connexion |
| `3` | En cours de déconnexion |

```js
// Vérifier l'état à tout moment
console.log(mongoose.connection.readyState); // 1 = OK
```
