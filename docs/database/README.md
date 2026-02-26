# Base de données Buzzer Beater — Documentation

Bienvenue dans la documentation de la base de données du projet **Buzzer Beater**.
Ce dossier explique tout ce que tu dois savoir pour interagir avec MongoDB dans ce projet.

---

## Stack utilisée

| Couche | Technologie |
|--------|-------------|
| Base de données | **MongoDB** (cloud Atlas ou local) |
| ODM | **Mongoose** v9 |
| Serveur API | **Express** v5 |
| Sécurité | **bcryptjs**, **dotenv** |

> **ODM** = Object Document Mapper. Mongoose fait le pont entre ton code JavaScript et MongoDB.

---

## Structure du dossier `backend_map/`

```
backend_map/
├── index.js              ← Point d'entrée, connexion MongoDB
├── .env                  ← Variables secrètes (non committé)
├── models/
│   ├── User.js           ← Modèle utilisateur
│   ├── Pin.js            ← Modèle pin (carte)
│   └── Post.js           ← Modèle post (forum)
└── routes/
    ├── users.js          ← Routes register / login
    ├── pins.js           ← Routes CRUD pins
    └── forum.js          ← Routes CRUD forum
```

---

## Sommaire

| Fichier | Contenu |
|---------|---------|
| [01-connexion.md](./01-connexion.md) | Se connecter à MongoDB, configurer `.env`, comprendre la connexion Mongoose |
| [02-modeles.md](./02-modeles.md) | Les 3 schémas de données : User, Pin, Post — chaque champ expliqué |
| [03-requetes.md](./03-requetes.md) | Toutes les opérations CRUD avec Mongoose (find, save, delete…) |
| [04-api-reference.md](./04-api-reference.md) | Référence complète de tous les endpoints REST de l'API |
| [05-compass.md](./05-compass.md) | Utiliser MongoDB Compass (interface graphique) pour explorer les données |
| [06-cas-pratiques.md](./06-cas-pratiques.md) | Cas pratiques : requêtes avancées, index, agrégations, debug courant |

---

## Démarrage rapide

```bash
# 1. Installer les dépendances
cd map_bb/backend_map
npm install

# 2. Créer le fichier .env
echo "Mongo_Url=mongodb+srv://..." > .env

# 3. Lancer le serveur
node index.js
# → "MongoDB connected!"
# → "Backend server is running!"
```

---

## Collections en base

Une fois connecté, MongoDB contient **3 collections** :

```
buzzerbeater (base)
├── users    ← comptes utilisateurs
├── pins     ← marqueurs sur la carte
└── posts    ← messages du forum
```
