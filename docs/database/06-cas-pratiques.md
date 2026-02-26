# 06 — Cas pratiques & Aller plus loin

## Sommaire
1. [Scripts utilitaires Node.js](#scripts-utilitaires-nodejs)
2. [Agrégations MongoDB](#agrégations-mongodb)
3. [Ajouter de nouvelles routes à l'API](#ajouter-de-nouvelles-routes-à-lapi)
4. [Ajouter un nouveau modèle](#ajouter-un-nouveau-modèle)
5. [Sécuriser les routes (middleware auth)](#sécuriser-les-routes-middleware-auth)
6. [Variables d'environnement et secrets](#variables-denvironnement-et-secrets)
7. [Sauvegarder et restaurer la base](#sauvegarder-et-restaurer-la-base)
8. [Erreurs fréquentes et solutions](#erreurs-fréquentes-et-solutions)

---

## Scripts utilitaires Node.js

Crée ces fichiers dans `map_bb/backend_map/scripts/` pour effectuer des opérations rapides.

### Lister tous les utilisateurs
**`scripts/list-users.js`**
```js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

async function main() {
    await mongoose.connect(process.env.Mongo_Url);
    const users = await User.find({}, '-password'); // sans mot de passe
    console.table(users.map(u => ({
        id: u._id.toString(),
        username: u.username,
        email: u.email,
        created: u.createdAt.toLocaleDateString('fr-FR'),
    })));
    await mongoose.disconnect();
}

main().catch(console.error);
```

```bash
node scripts/list-users.js
```

---

### Statistiques globales
**`scripts/stats.js`**
```js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Pin  = require('../models/Pin');
const Post = require('../models/Post');

async function main() {
    await mongoose.connect(process.env.Mongo_Url);

    const [users, pins, posts] = await Promise.all([
        User.countDocuments(),
        Pin.countDocuments(),
        Post.countDocuments(),
    ]);

    const totalReplies = await Post.aggregate([
        { $project: { count: { $size: '$replies' } } },
        { $group: { _id: null, total: { $sum: '$count' } } }
    ]);

    const avgRating = await Pin.aggregate([
        { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);

    console.log('=== Statistiques Buzzer Beater ===');
    console.log(`Utilisateurs : ${users}`);
    console.log(`Pins sur la carte : ${pins}`);
    console.log(`Posts du forum : ${posts}`);
    console.log(`Réponses forum : ${totalReplies[0]?.total ?? 0}`);
    console.log(`Note moyenne des terrains : ${avgRating[0]?.avg?.toFixed(2) ?? 'N/A'} / 5`);

    await mongoose.disconnect();
}

main().catch(console.error);
```

---

### Supprimer un utilisateur et toutes ses données
**`scripts/delete-user.js`**
```js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Pin  = require('../models/Pin');
const Post = require('../models/Post');

const USERNAME = process.argv[2]; // node delete-user.js chris

if (!USERNAME) {
    console.error('Usage : node delete-user.js <username>');
    process.exit(1);
}

async function main() {
    await mongoose.connect(process.env.Mongo_Url);

    const user = await User.findOne({ username: USERNAME });
    if (!user) {
        console.log(`Utilisateur "${USERNAME}" introuvable.`);
        return mongoose.disconnect();
    }

    const [pinsResult, postsResult] = await Promise.all([
        Pin.deleteMany({ username: USERNAME }),
        Post.deleteMany({ username: USERNAME }),
    ]);
    await User.deleteOne({ username: USERNAME });

    console.log(`Utilisateur "${USERNAME}" supprimé.`);
    console.log(`Pins supprimés : ${pinsResult.deletedCount}`);
    console.log(`Posts supprimés : ${postsResult.deletedCount}`);

    await mongoose.disconnect();
}

main().catch(console.error);
```

```bash
node scripts/delete-user.js chris
```

---

## Agrégations MongoDB

Le **pipeline d'agrégation** permet de faire des calculs complexes directement en base.

### Top 5 des meilleurs terrains
```js
const top5 = await Pin.aggregate([
    { $sort: { rating: -1 } },
    { $limit: 5 },
    { $project: { title: 1, username: 1, rating: 1, _id: 0 } }
]);
```

### Pins groupés par utilisateur
```js
const byUser = await Pin.aggregate([
    { $group: {
        _id: '$username',
        totalPins: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        maxRating: { $max: '$rating' },
    }},
    { $sort: { totalPins: -1 } }
]);
// → [{ _id: 'chris', totalPins: 7, avgRating: 4.2, maxRating: 5 }, ...]
```

### Posts les plus actifs (le plus de réponses)
```js
const mostActive = await Post.aggregate([
    { $project: {
        title: 1,
        username: 1,
        replyCount: { $size: '$replies' }
    }},
    { $sort: { replyCount: -1 } },
    { $limit: 10 }
]);
```

### Nombre de posts par jour (derniers 7 jours)
```js
const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

const postsByDay = await Post.aggregate([
    { $match: { createdAt: { $gte: weekAgo } } },
    { $group: {
        _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
        },
        count: { $sum: 1 }
    }},
    { $sort: { _id: 1 } }
]);
// → [{ _id: "2025-01-15", count: 3 }, { _id: "2025-01-16", count: 7 }, ...]
```

---

## Ajouter de nouvelles routes à l'API

### Exemple : route pour récupérer les pins d'un utilisateur

**Dans `routes/pins.js` :**
```js
// GET /api/pins/user/:username — pins d'un utilisateur spécifique
router.get('/user/:username', async (req, res) => {
    try {
        const pins = await Pin.find({ username: req.params.username })
                              .sort({ createdAt: -1 });
        res.status(200).json(pins);
    } catch (err) {
        res.status(500).json(err);
    }
});
```

**Enregistre dans `index.js` :** rien à changer, la route est déjà montée sur `/api/pins`.

**Test :**
```
GET http://localhost:3000/api/pins/user/chris
```

---

### Exemple : route pour récupérer un post par ID

**Dans `routes/forum.js` :**
```js
// GET /api/forum/posts/:id — un seul post
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json('Post introuvable');
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});
```

---

## Ajouter un nouveau modèle

Exemple d'ajout d'un modèle **Comment** (commentaires sur les pins) :

**`models/Comment.js`**
```js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    pinId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Pin', required: true },
    username: { type: String, required: true },
    content:  { type: String, required: true, maxlength: 500 },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
```

**`routes/comments.js`** (à créer)
```js
const router = require('express').Router();
const Comment = require('../models/Comment');

router.get('/:pinId', async (req, res) => {
    const comments = await Comment.find({ pinId: req.params.pinId })
                                  .sort({ createdAt: 1 });
    res.status(200).json(comments);
});

router.post('/', async (req, res) => {
    const comment = new Comment(req.body);
    const saved = await comment.save();
    res.status(200).json(saved);
});

module.exports = router;
```

**Dans `index.js` :**
```js
const commentRoute = require('./routes/comments');
app.use('/api/comments', commentRoute);
```

---

## Sécuriser les routes (middleware auth)

Actuellement, n'importe qui peut créer un pin en passant n'importe quel `username` dans le body. Pour sécuriser ça avec JWT :

### Installation
```bash
npm install jsonwebtoken
```

### Générer un token au login
**Dans `routes/users.js` :**
```js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET; // ajouter dans .env

// Dans la route login, remplacer la réponse par :
const token = jwt.sign(
    { id: user._id, username: user.username },
    SECRET,
    { expiresIn: '7d' }
);
res.status(200).json({ token, username: user.username });
```

### Middleware de vérification
**`middleware/verifyToken.js`**
```js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json('Accès refusé');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, username }
        next();
    } catch (err) {
        res.status(403).json('Token invalide');
    }
};
```

### Protéger une route
```js
const verifyToken = require('../middleware/verifyToken');

// Route protégée : seulement les utilisateurs connectés peuvent créer un pin
router.post('/', verifyToken, async (req, res) => {
    const newPin = new Pin({ ...req.body, username: req.user.username });
    // ...
});
```

---

## Variables d'environnement et secrets

**Fichier `.env` complet recommandé :**
```env
# Base de données
Mongo_Url=mongodb+srv://...

# Sécurité JWT (si tu l'ajoutes)
JWT_SECRET=une_chaine_aleatoire_tres_longue_ici_change_moi

# Environnement
NODE_ENV=development
PORT=3000
```

**Ne jamais commiter `.env`** — vérifie ton `.gitignore` :
```
# .gitignore
.env
*.env
node_modules/
```

---

## Sauvegarder et restaurer la base

### Exporter avec `mongoexport` (par collection)
```bash
# Exporter tous les pins en JSON
mongoexport --uri="mongodb+srv://..." --collection=pins --out=backup_pins.json

# Exporter tous les users (sans mot de passe)
mongoexport --uri="mongodb+srv://..." --collection=users \
  --fields="username,email,createdAt" --out=backup_users.json
```

### Exporter avec `mongodump` (base entière)
```bash
mongodump --uri="mongodb+srv://..." --out=./backup/
```

### Restaurer avec `mongorestore`
```bash
mongorestore --uri="mongodb+srv://..." ./backup/
```

> Ces outils sont inclus dans [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools).

---

## Erreurs fréquentes et solutions

### `Cast to ObjectId failed for value "..."`
L'ID passé dans la requête n'est pas un ObjectId valide.
```js
// Avant de faire findById, valider l'ID :
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json('ID invalide');
}
```

### `ValidationError: Path X is required`
Un champ `required: true` n'a pas été fourni.
- Vérifie le body de ta requête
- Vérifie les noms de champs (attention aux fautes de frappe)

### `MongoServerError: E11000 duplicate key`
Tu essaies d'insérer un document avec un `username` ou `email` déjà utilisé.
```js
// Capturer cette erreur dans le catch :
if (err.code === 11000) {
    return res.status(400).json('Ce username ou email est déjà utilisé');
}
```

### Les données ne persistent pas entre les redémarrages
Normal — vérifie que tu es bien connecté à MongoDB (pas à une DB en mémoire). Le message `MongoDB connected!` doit apparaître au démarrage.

### `ReferenceError: ObjectId is not defined`
```js
// Importer correctement :
const mongoose = require('mongoose');
// Utiliser :
mongoose.Types.ObjectId.isValid(id)
```
