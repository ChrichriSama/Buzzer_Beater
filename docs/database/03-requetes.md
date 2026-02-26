# 03 — Requêtes avec Mongoose (CRUD)

## Sommaire
1. [Les 4 opérations CRUD](#les-4-opérations-crud)
2. [CREATE — Créer des documents](#create--créer-des-documents)
3. [READ — Lire des documents](#read--lire-des-documents)
4. [UPDATE — Modifier des documents](#update--modifier-des-documents)
5. [DELETE — Supprimer des documents](#delete--supprimer-des-documents)
6. [Requêtes avancées](#requêtes-avancées)
7. [Travailler avec les subdocuments](#travailler-avec-les-subdocuments)

---

## Les 4 opérations CRUD

| Opération | Mongoose | SQL équivalent |
|-----------|----------|----------------|
| **C**reate | `new Model().save()` / `Model.create()` | `INSERT INTO` |
| **R**ead | `Model.find()` / `Model.findById()` | `SELECT` |
| **U**pdate | `Model.findByIdAndUpdate()` | `UPDATE` |
| **D**elete | `Model.findByIdAndDelete()` / `.deleteOne()` | `DELETE` |

---

## CREATE — Créer des documents

### Méthode 1 : `new Model() + .save()`
```js
const Pin = require('../models/Pin');

const newPin = new Pin({
    username: 'chris',
    title: 'Terrain République',
    desc: 'Excellent terrain en plein air',
    rating: 5,
    lat: 48.8671,
    long: 2.3635,
});

const savedPin = await newPin.save();
console.log(savedPin._id); // ObjectId généré
```

### Méthode 2 : `Model.create()`
```js
const pin = await Pin.create({
    username: 'chris',
    title: 'Terrain Bastille',
    desc: 'Petit terrain sympa',
    rating: 3,
    lat: 48.8533,
    long: 2.3692,
});
```

### Insérer plusieurs documents d'un coup
```js
await Pin.insertMany([
    { username: 'chris', title: 'Terrain A', desc: '...', rating: 4, lat: 48.85, long: 2.35 },
    { username: 'chris', title: 'Terrain B', desc: '...', rating: 3, lat: 48.86, long: 2.36 },
]);
```

---

## READ — Lire des documents

### Récupérer tous les documents
```js
const pins = await Pin.find();
// → tableau de tous les pins
```

### Filtrer avec des conditions
```js
// Tous les pins de "chris"
const christPins = await Pin.find({ username: 'chris' });

// Tous les pins avec une note >= 4
const goodPins = await Pin.find({ rating: { $gte: 4 } });

// Pins de "chris" avec note >= 4
const filtered = await Pin.find({ username: 'chris', rating: { $gte: 4 } });
```

### Récupérer un seul document
```js
// Par _id
const pin = await Pin.findById('64a1b2c3d4e5f6789012345b');

// Par condition (le premier qui correspond)
const user = await User.findOne({ username: 'chris' });
```

### Choisir les champs retournés (projection)
```js
// Retourner uniquement username et title (pas les coordonnées GPS)
const pins = await Pin.find({}, 'username title');

// Exclure le mot de passe
const users = await User.find({}, '-password');
```

### Trier les résultats
```js
// Trier par date de création (plus récent en premier)
const posts = await Post.find().sort({ createdAt: -1 });

// Trier par rating décroissant
const topPins = await Pin.find().sort({ rating: -1 });
```

### Limiter le nombre de résultats
```js
// Les 10 derniers posts
const recent = await Post.find().sort({ createdAt: -1 }).limit(10);

// Pagination : page 2 avec 10 éléments par page
const page = 2;
const perPage = 10;
const paginated = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);
```

### Compter les documents
```js
const total = await Pin.countDocuments(); // tous les pins
const userPins = await Pin.countDocuments({ username: 'chris' });
```

---

## UPDATE — Modifier des documents

### Modifier par ID
```js
const updated = await Pin.findByIdAndUpdate(
    '64a1b2c3d4e5f6789012345b',  // ID du document
    { rating: 5, desc: 'Incroyable terrain !' }, // modifications
    { new: true }  // retourner le document APRÈS modification
);
```

> Sans `{ new: true }`, Mongoose retourne l'ancien document (avant modification).

### Opérateurs de mise à jour
```js
// Incrémenter un champ
await Pin.findByIdAndUpdate(id, { $inc: { rating: 1 } });

// Ajouter un élément à un tableau
await Post.findByIdAndUpdate(id, {
    $push: { replies: { username: 'chris', content: 'Super !' } }
});

// Retirer un élément d'un tableau
await Post.findByIdAndUpdate(id, {
    $pull: { replies: { _id: replyId } }
});

// Modifier un champ seulement s'il n'existe pas encore
await User.findByIdAndUpdate(id, { $setOnInsert: { role: 'user' } });
```

### Modifier plusieurs documents à la fois
```js
// Mettre à jour tous les pins avec rating = 0 à rating = 1
await Pin.updateMany(
    { rating: 0 },
    { $set: { rating: 1 } }
);
```

---

## DELETE — Supprimer des documents

### Supprimer par ID
```js
await Pin.findByIdAndDelete('64a1b2c3d4e5f6789012345b');
```

### Supprimer selon condition
```js
// Supprimer tous les pins de "chris"
await Pin.deleteMany({ username: 'chris' });
```

### Supprimer un document depuis une instance
```js
const post = await Post.findById(id);
if (post) {
    await post.deleteOne();
}
```

---

## Requêtes avancées

### Opérateurs de comparaison

| Opérateur | Signification | Exemple |
|-----------|--------------|---------|
| `$gt` | supérieur à | `{ rating: { $gt: 3 } }` |
| `$gte` | supérieur ou égal | `{ rating: { $gte: 4 } }` |
| `$lt` | inférieur à | `{ rating: { $lt: 3 } }` |
| `$lte` | inférieur ou égal | `{ rating: { $lte: 2 } }` |
| `$ne` | différent de | `{ username: { $ne: 'admin' } }` |
| `$in` | dans la liste | `{ rating: { $in: [4, 5] } }` |
| `$nin` | pas dans la liste | `{ rating: { $nin: [1, 2] } }` |

### Opérateurs logiques

```js
// OR : pins avec note 5 OU créés par "chris"
await Pin.find({
    $or: [{ rating: 5 }, { username: 'chris' }]
});

// AND explicite
await Pin.find({
    $and: [{ rating: { $gte: 4 } }, { username: 'chris' }]
});

// NOT
await Pin.find({
    rating: { $not: { $lt: 3 } }  // équivalent à rating >= 3
});
```

### Recherche dans les chaînes (regex)
```js
// Tous les posts dont le titre contient "NBA" (insensible à la casse)
await Post.find({ title: { $regex: 'NBA', $options: 'i' } });

// Raccourci avec RegExp JS
await Post.find({ title: /wembanyama/i });
```

### Recherche géographique (pins proches d'un point)
```js
// Pins dans un carré autour de Paris (approximatif)
const nearby = await Pin.find({
    lat:  { $gte: 48.80, $lte: 48.90 },
    long: { $gte: 2.25,  $lte: 2.40 },
});
```

---

## Travailler avec les subdocuments

Les **réponses** (`replies`) sont des subdocuments dans `Post`. Voici comment les manipuler.

### Lire les réponses d'un post
```js
const post = await Post.findById(postId);
console.log(post.replies);         // tableau de réponses
console.log(post.replies.length);  // nombre de réponses
```

### Ajouter une réponse
```js
const post = await Post.findById(postId);
post.replies.push({
    username: 'chris',
    content: 'Super message !'
});
await post.save(); // sauvegarde tout le document
```

### Trouver une réponse par son ID
```js
const post = await Post.findById(postId);
const reply = post.replies.id(replyId); // .id() est une méthode Mongoose
console.log(reply.content);
```

### Modifier une réponse
```js
const post = await Post.findById(postId);
const reply = post.replies.id(replyId);
reply.content = 'Texte modifié';
await post.save();
```

### Supprimer une réponse
```js
const post = await Post.findById(postId);
post.replies.pull(replyId); // retire la réponse du tableau
await post.save();
```

---

## Résumé des méthodes essentielles

```js
// CREATE
new Model(data).save()
Model.create(data)

// READ
Model.find(filter)
Model.findById(id)
Model.findOne(filter)
Model.countDocuments(filter)

// UPDATE
Model.findByIdAndUpdate(id, update, { new: true })
Model.updateMany(filter, update)

// DELETE
Model.findByIdAndDelete(id)
Model.deleteMany(filter)
instance.deleteOne()

// CHAÎNAGE
Model.find(filter).sort().limit().skip().select()
```
