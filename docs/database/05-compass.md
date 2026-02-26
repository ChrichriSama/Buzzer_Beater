# 05 — MongoDB Compass (Interface graphique)

MongoDB Compass est l'outil officiel pour explorer et modifier ta base de données **visuellement**, sans écrire de code.

## Sommaire
1. [Installation](#installation)
2. [Se connecter à la base](#se-connecter-à-la-base)
3. [Explorer les collections](#explorer-les-collections)
4. [Faire des requêtes visuellement](#faire-des-requêtes-visuellement)
5. [Modifier et supprimer des documents](#modifier-et-supprimer-des-documents)
6. [Voir les index](#voir-les-index)
7. [Utiliser le shell intégré](#utiliser-le-shell-intégré)
8. [Cas d'usage pratiques](#cas-dusage-pratiques)

---

## Installation

1. Télécharge MongoDB Compass sur : [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
2. Installe-le (version **Compass** stable, pas Community)
3. Lance l'application

---

## Se connecter à la base

### Avec MongoDB Atlas (cloud)

1. Ouvre Compass
2. Clique sur **"New Connection"**
3. Dans le champ URI, colle l'URL de ton `.env` :
```
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/buzzerbeater
```
4. Clique sur **"Connect"**

### Depuis ton `.env`
Tu peux copier-coller directement la valeur de `Mongo_Url` depuis ton fichier `map_bb/backend_map/.env`.

---

## Explorer les collections

Une fois connecté, tu verras dans le panneau gauche :

```
buzzerbeater
├── pins     (X documents)
├── posts    (X documents)
└── users    (X documents)
```

Clique sur une collection pour voir tous ses documents.

**Vue document :**
Chaque document s'affiche avec tous ses champs. Tu peux passer en vue **JSON**, **Table**, ou **Tree**.

- Vue **List** : documents sous forme de cartes
- Vue **Table** : tableau avec colonnes (pratique pour comparer)
- Vue **JSON** : le JSON brut tel qu'il est stocké

---

## Faire des requêtes visuellement

Dans la barre du haut d'une collection, il y a un champ **Filter** :

### Exemples de filtres

```json
// Tous les pins de "chris"
{ "username": "chris" }

// Pins avec une note >= 4
{ "rating": { "$gte": 4 } }

// Posts qui contiennent "Wembanyama" dans le titre
{ "title": { "$regex": "Wembanyama", "$options": "i" } }

// Utilisateur avec cet email exact
{ "email": "chris@example.com" }

// Posts qui ont au moins 2 réponses
{ "replies.2": { "$exists": true } }
```

### Options de tri et de projection

- **Sort** : trier les résultats
  ```json
  { "createdAt": -1 }  // plus récent en premier
  { "rating": -1 }     // mieux noté en premier
  ```

- **Project** : choisir les champs affichés
  ```json
  { "username": 1, "title": 1, "_id": 0 }  // seulement username et title
  ```

- **Limit** : limiter le nombre de résultats (ex: `10`)

---

## Modifier et supprimer des documents

### Modifier un document
1. Passe la souris sur un document → clique sur l'icône **crayon** ✏️
2. Clique sur le champ à modifier
3. Tape la nouvelle valeur
4. Clique sur **"Update"**

### Supprimer un document
1. Passe la souris sur un document → clique sur l'icône **poubelle** 🗑️
2. Confirme la suppression

> ⚠️ La suppression est **irréversible**. Il n'y a pas de corbeille.

### Ajouter un document manuellement
1. Clique sur le bouton **"Add Data"** → **"Insert Document"**
2. Remplis le JSON :
```json
{
  "username": "test",
  "title": "Terrain test",
  "desc": "Créé manuellement",
  "rating": 3,
  "lat": 48.85,
  "long": 2.35
}
```
3. Clique sur **"Insert"**

---

## Voir les index

Les **index** permettent d'accélérer les recherches. Mongoose crée automatiquement des index pour les champs `unique: true`.

1. Dans une collection → onglet **"Indexes"**

Tu verras par exemple pour `users` :
```
_id_          → index sur _id (créé automatiquement par MongoDB)
username_1    → index unique sur username
email_1       → index unique sur email
```

Le suffixe `_1` signifie index ascendant. `-1` serait descendant.

---

## Utiliser le shell intégré

Compass inclut un **shell MongoDB** (en bas de l'écran, onglet `>_`). Il permet d'exécuter des commandes JavaScript/MongoDB directement.

### Commandes utiles

```js
// Voir la base actuelle
db.getName()  // → "buzzerbeater"

// Lister les collections
db.getCollectionNames()  // → ["pins", "posts", "users"]

// Compter les documents
db.pins.countDocuments()
db.users.countDocuments()

// Voir tous les pins de "chris"
db.pins.find({ username: "chris" }).pretty()

// Voir le dernier post créé
db.posts.find().sort({ createdAt: -1 }).limit(1).pretty()

// Voir un utilisateur (sans son mot de passe)
db.users.findOne({ username: "chris" }, { password: 0 })

// Supprimer tous les pins avec rating = 0
db.pins.deleteMany({ rating: 0 })

// Modifier tous les posts sans réponses pour ajouter un champ
db.posts.updateMany(
  { "replies": { $size: 0 } },
  { $set: { hasReplies: false } }
)
```

---

## Cas d'usage pratiques

### Vérifier qu'un utilisateur existe
```js
db.users.findOne({ username: "chris" })
// Si null → l'utilisateur n'existe pas
```

### Trouver quel utilisateur a créé un pin
```js
db.pins.findOne({ _id: ObjectId("64a1b2...") })
// → regarde le champ "username"
```

### Voir tous les posts d'un utilisateur
```js
db.posts.find({ username: "chris" }).pretty()
```

### Voir combien de pins chaque utilisateur a créé
```js
db.pins.aggregate([
  { $group: { _id: "$username", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])
// → [{ _id: "chris", total: 5 }, { _id: "yannis", total: 3 }, ...]
```

### Trouver les terrains les mieux notés
```js
db.pins.find({ rating: 5 }).sort({ createdAt: -1 }).pretty()
```

### Réinitialiser le mot de passe d'un utilisateur
```js
// ATTENTION : tu dois avoir le hash bcrypt du nouveau mot de passe
// Génère-le dans Node.js : bcrypt.hashSync('nouveauMotDePasse', 10)
db.users.updateOne(
  { username: "chris" },
  { $set: { password: "$2b$10$...hash..." } }
)
```

### Supprimer un compte utilisateur et tous ses pins
```js
db.users.deleteOne({ username: "test" })
db.pins.deleteMany({ username: "test" })
db.posts.deleteMany({ username: "test" })
```
