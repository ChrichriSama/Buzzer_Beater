# Buzzer Beater — Compte Rendu de Projet

**Module : Programmation Web — APP3**
**Année : 2025-2026**

---

**Membres de l'équipe :**

| Nom | Prénom |
|-----|--------|
| LAHLOU-MIMI | Yanis |
| *[NOM]* | Christopher |

**Nom du projet :** Buzzer Beater
**Date de rendu :** 26 février 2025

---

## Table des matières

1. [Contexte](#1-contexte)
2. [Planification](#2-planification)
   - 2.1 [Répartition des rôles](#21-répartition-des-rôles)
   - 2.2 [Compétences et nouvelles technologies](#22-compétences-et-nouvelles-technologies)
   - 2.3 [Cahier des charges](#23-cahier-des-charges)
   - 2.4 [Planning prévisionnel et réalisé](#24-planning-prévisionnel-et-réalisé)
3. [Description du développement](#3-description-du-développement)
   - 3.1 [Technologies utilisées](#31-technologies-utilisées)
   - 3.2 [Étapes et tâches](#32-étapes-et-tâches)
   - 3.3 [Difficultés rencontrées et solutions](#33-difficultés-rencontrées-et-solutions)
   - 3.4 [État du projet](#34-état-du-projet)
4. [Mise en production](#4-mise-en-production)
5. [Conclusion et bilan réflexif](#5-conclusion-et-bilan-réflexif)
6. [Annexes](#6-annexes)

---

## 1. Contexte

### Présentation du projet

**Buzzer Beater** est un site web dédié à la NBA (National Basketball Association), la ligue de basketball professionnelle américaine. Son objectif est de regrouper en un seul endroit les informations essentielles pour les passionnés : actualités, fiches d'équipes, carte interactive des terrains de basketball, et une communauté via un forum.

### Motivation et choix du sujet

Le projet est né d'un intérêt commun pour le basketball et le sport en général. En observant que les informations NBA en français sont souvent dispersées sur plusieurs sites, nous avons voulu concevoir une plateforme centralisée, en français, offrant une expérience cohérente et agréable. Le nom « Buzzer Beater » — terme désignant un panier marqué à la dernière seconde — reflète l'esprit dynamique et passionné que nous voulons transmettre.

### Contexte d'usage

Le site s'adresse principalement à des fans de la NBA francophones souhaitant :
- Suivre les actualités NBA en temps réel
- Consulter les fiches détaillées des 30 équipes de la ligue
- Trouver des terrains de basketball à proximité via une carte interactive
- Partager leur passion au sein d'une communauté

L'ensemble du site est conçu pour fonctionner en local (client et serveur), sans nécessité d'hébergement externe pour la démonstration.

---

## 2. Planification

### 2.1 Répartition des rôles

Le projet a été développé en binôme, avec une répartition semi-spécialisée :

| Membre | Responsabilités principales |
|--------|-----------------------------|
| Yanis | Back-end (API Node.js/Express, MongoDB), module carte (map_bb backend), intégration React, architecture de la base de données |
| Christopher | Front-end (HTML/CSS/JS), pages statiques (accueil, équipes, actualités), intégration RSS, mise en forme responsive |

Les décisions architecturales (choix des frameworks, structure du projet, modèles de données) ont été prises conjointement.

### 2.2 Compétences et nouvelles technologies

| Membre | Technologies déjà maîtrisées | Technologies abordées pour la première fois |
|--------|-------------------------------|---------------------------------------------|
| Yanis | HTML, CSS, JavaScript, bases Git | Node.js, Express.js, MongoDB/Mongoose, React, Vite, Mapbox GL |
| Christopher | HTML, CSS, JavaScript, bases Git | Node.js, API REST, MongoDB, intégration RSS, React |

### 2.3 Cahier des charges

#### Exigences fonctionnelles

| ID | Fonctionnalité | Priorité | État |
|----|----------------|----------|------|
| F01 | Page d'accueil avec présentation du site | Haute | ✅ Réalisé |
| F02 | Agrégateur d'actualités NBA (RSS) | Haute | ✅ Réalisé |
| F03 | Encyclopédie des 30 équipes NBA | Haute | ✅ Réalisé |
| F04 | Inscription et connexion utilisateur | Haute | ✅ Réalisé |
| F05 | Carte interactive des terrains de basketball | Haute | ✅ Réalisé |
| F06 | Ajout/consultation de pins sur la carte | Haute | ✅ Réalisé |
| F07 | Forum communautaire | Moyenne | ⏳ En cours |
| F08 | Section résultats / scores NBA | Basse | ❌ Non réalisé |
| F09 | Mode sombre / clair | Basse | ❌ Non réalisé |

#### Exigences techniques

| ID | Contrainte | État |
|----|------------|------|
| T01 | Site avec front-end et back-end | ✅ Réalisé |
| T02 | Site dynamique (local + serveur) | ✅ Réalisé |
| T03 | Utilisation d'au moins un framework | ✅ React + Express |
| T04 | Base de données | ✅ MongoDB (Atlas) |
| T05 | Design responsive | ✅ Réalisé |
| T06 | Code commenté et organisé | ✅ Réalisé |

#### Exigences non fonctionnelles

- **Accessibilité** : Attributs `alt` sur les images, navigation clavier, contrastes suffisants
- **Performance** : Chargement RSS asynchrone, lazy rendering des fiches équipes
- **Sécurité** : Mots de passe hashés (bcrypt), variables d'environnement pour les clés API

### 2.4 Planning prévisionnel et réalisé

#### Planning prévisionnel

| Période | Tâches prévues |
|---------|----------------|
| Semaine 1 (jan.) | Idéation, choix du sujet, définition des fonctionnalités, maquettes |
| Semaine 2 | Mise en place de l'environnement, création de la structure HTML/CSS de base |
| Semaine 3 | Développement du front-end (accueil, actualités) |
| Semaine 4 | Développement back-end (API, base de données MongoDB, modèles) |
| Semaine 5 | Page équipes, intégration RSS |
| Semaine 6 (fév.) | Module carte (React + Mapbox) |
| Semaine 7 | Authentification utilisateur, connexion front/back |
| Semaine 8 | Tests, corrections, forum (si temps) |
| Semaine 9 | Finalisation, rapport, préparation de la soutenance |

#### Planning réalisé (journal de bord)

| Date | Avancement |
|------|------------|
| Mi-janvier | Mise en place du projet, structure de base, premiers commits |
| 16 février | Avancement significatif (commit : *feat: avancement 16/02*) — structure des pages principales, CSS de base validé |
| 17-19 février | Travail sur les actualités NBA (flux RSS, affichage des cartes), retouches CSS |
| 20-22 février | Rework CSS global, refonte du design des pages équipes et actualités |
| 23-26 février | Finalisation des pages, corrections mineures, rédaction du rapport |

> **Note :** L'apprentissage de React et de l'API Mapbox a représenté une part significative du temps du projet et a légèrement décalé le calendrier prévu pour le forum, qui n'a pas pu être finalisé.

---

## 3. Description du développement

### 3.1 Technologies utilisées

#### Front-end (site principal)

| Technologie | Justification |
|-------------|---------------|
| **HTML5** | Structure sémantique des pages, accessibilité native (`<nav>`, `<article>`, `<section>`, etc.) |
| **CSS3** | Styling avancé : variables CSS, effets glassmorphism, media queries pour le responsive, animations |
| **JavaScript (Vanilla)** | Interactions dynamiques côté client : parsing RSS, validation de formulaires en temps réel, génération dynamique de HTML |
| **Font Awesome (CDN)** | Bibliothèque d'icônes légère et facile à intégrer |

Nous avons choisi de ne pas utiliser de framework CSS (comme Bootstrap ou Tailwind) pour le site principal afin d'avoir un contrôle total sur le design et d'en apprendre davantage sur le CSS pur. Cela nous a permis de développer une identité visuelle personnalisée avec une palette de couleurs cohérente (tons sombres, bleu NBA).

#### Back-end (API REST)

| Technologie | Justification |
|-------------|---------------|
| **Node.js** | Runtime JavaScript côté serveur, cohérence avec le front-end |
| **Express.js (v5)** | Framework minimaliste pour créer des routes RESTful rapidement |
| **MongoDB (Atlas)** | Base de données NoSQL adaptée aux données semi-structurées (pins avec coordonnées, profils utilisateurs) |
| **Mongoose** | ODM pour MongoDB, schémas de données clairs et validation intégrée |
| **bcrypt** | Hashage des mots de passe, sécurité des comptes utilisateurs |
| **dotenv** | Gestion des variables d'environnement (clés API, URL de base de données) |
| **CORS** | Gestion des requêtes cross-origin entre front-end (port 5173) et back-end (port 3000) |

#### Module carte (map_bb)

| Technologie | Justification |
|-------------|---------------|
| **React (v19)** | Framework JavaScript déclaratif, idéal pour une interface interactive comme une carte avec état (pins, popups) |
| **Vite** | Outil de build rapide avec Hot Module Replacement (HMR) pour le développement |
| **Mapbox GL / react-map-gl** | Bibliothèque de cartographie interactive puissante, personnalisable, avec une API bien documentée |
| **Material-UI (MUI)** | Composants React prêts à l'emploi pour les formulaires et les popups |
| **Axios** | Client HTTP pour les appels à l'API back-end |

Le choix de React pour le module carte est justifié par la nature stateful de cette fonctionnalité : la gestion des pins (liste, sélection, création) nécessite un état complexe qui aurait été difficile à gérer proprement en JavaScript vanilla.

### 3.2 Étapes et tâches

#### Structure du projet

```
Buzzer_Beater/
├── bb_menu.html          ← Page d'accueil
├── bb_news.html          ← Actualités NBA (RSS)
├── bb_teams.html         ← Encyclopédie des 30 équipes
├── login.html            ← Connexion utilisateur
├── register.html         ← Inscription utilisateur
├── style_teams.css       ← Feuille de style principale
├── assets/               ← Images, logos, photos
│   ├── nba_teams_logo/
│   └── Parallax/
├── map_bb/               ← Module carte (application React)
│   ├── backend_map/      ← API Node.js/Express
│   │   ├── index.js
│   │   ├── models/       ← User.js, Pin.js
│   │   └── routes/       ← users.js, pins.js
│   └── frontend_map/     ← Application React/Vite
│       └── src/
│           └── App.jsx
└── Projet_Consigne/      ← Documents fournis par la prof
```

#### Design et charte graphique

Le site adopte une identité visuelle sombre et moderne, inspirée de l'univers NBA :
- **Palette** : Noir/gris foncé (`#1a1a1a`), bleu NBA (`#1d428a`), blanc cassé
- **Style** : Effets glassmorphism (flou d'arrière-plan, transparence), dégradés, bordures lumineuses
- **Typographie** : Police système sans-serif pour la lisibilité
- **Images** : Photos de joueurs en parallaxe pour les sections équipes

#### Page d'accueil (`bb_menu.html`)

La page d'accueil présente :
- Une barre de navigation responsive avec menu hamburger (mobile)
- Un hero section avec le logo et le slogan
- Une grille de 4 cartes de fonctionnalités principales
- Un aperçu des 3 dernières actualités (chargées via RSS)
- Un carousel de 8 équipes NBA en vedette
- Une section forum (placeholder)
- Un footer avec liens de navigation

![Capture d'écran de la page d'accueil — hero section et grille de fonctionnalités]
*Figure 1 : Page d'accueil de Buzzer Beater*

#### Page actualités (`bb_news.html`)

La page actualités récupère dynamiquement les articles NBA depuis le flux RSS de **RMC Sport** (`rmcsport.bfmtv.com/rss/basket/nba/`) via un proxy CORS ([corsproxy.io](https://corsproxy.io)).

Le flux XML est parsé en JavaScript natif avec `DOMParser`, et les articles sont affichés sous forme de cards avec : titre, description, image, date de publication et lien vers l'article source.

*Figure 2 : Page actualités avec les articles NBA chargés dynamiquement*

#### Page équipes (`bb_teams.html`)

Cette page répertorie les 30 équipes NBA avec pour chacune :
- Localisation et surnom
- Contexte historique et informations générales (2-3 paragraphes)
- Effectif actuel (cinq majeur)
- Image de fond en effet parallaxe

La page utilise une structure HTML répétitive (une section par équipe). Une piste d'amélioration serait de générer ces sections dynamiquement depuis la base de données.

#### Authentification (`login.html` / `register.html`)

**Inscription :**
- Validation en temps réel : format email (indicateur ✓/✗), longueur du pseudo (3-20 car.), confirmation du mot de passe (≥ 8 car.)
- Bascule affichage/masquage du mot de passe

**Connexion :**
- Formulaire simple avec bascule d'affichage du mot de passe
- Connecté à l'API back-end

**Back-end (routes `POST /api/users/register` et `POST /api/users/login`) :**
- Le mot de passe est hashé avec `bcrypt` avant stockage en base
- La connexion vérifie le hash avec `bcrypt.compare()`

#### Schéma relationnel / modèles MongoDB

**Modèle User :**
```
User {
  username : String (unique, requis, 3-20 car.)
  email    : String (unique, requis, max 60 car.)
  password : String (requis, hashé bcrypt, min 6 car.)
  createdAt / updatedAt : Date (auto)
}
```

**Modèle Pin (terrain de basketball) :**
```
Pin {
  username : String (requis) — créateur du pin
  title    : String (requis) — nom du lieu
  desc     : String (requis) — avis / description
  rating   : Number (requis, 0-5) — note du terrain
  lat      : Number (requis) — latitude
  long     : Number (requis) — longitude
  createdAt / updatedAt : Date (auto)
}
```

*Figure 3 : Schéma des modèles MongoDB*

#### Module carte (`map_bb`)

Le module carte est une sous-application React distincte qui :
- Affiche une carte interactive Mapbox centrée initialement sur Paris
- Récupère tous les pins depuis l'API (`GET /api/pins`) et les affiche sur la carte
- Permet à un utilisateur connecté de cliquer sur la carte pour ajouter un nouveau terrain (titre, description, note)
- Affiche un popup pour chaque pin avec les informations du terrain et la date de création

*Figure 4 : Module carte avec pins de terrains de basketball*

#### Design responsive

Le site est adapté à plusieurs tailles d'écran via des media queries CSS :
- **Desktop (> 1024px)** : Layout en grille multi-colonnes, hero plein écran
- **Tablette (768px - 1024px)** : Grilles réduites à 2 colonnes
- **Mobile (< 768px)** : Menu hamburger, colonnes uniques, images redimensionnées

### 3.3 Difficultés rencontrées et solutions

#### Problème CORS avec le flux RSS

**Problème :** Le flux RSS de RMC Sport ne peut pas être directement requis depuis un navigateur (restriction CORS).

**Approche échouée :** Tentative de requête directe `fetch(url)` → bloquée par le navigateur.

**Solution choisie :** Utilisation du proxy public `corsproxy.io` qui agit comme intermédiaire. L'URL est préfixée : `https://corsproxy.io/?url=https://rmcsport.bfmtv.com/rss/basket/nba/`

**Limitation :** Dépendance à un service tiers, potentiellement peu fiable. La solution idéale serait de créer un endpoint back-end `/api/news` qui récupère et met en cache le flux RSS côté serveur.

#### Apprentissage de React et Mapbox

**Problème :** Aucun membre de l'équipe n'avait utilisé React ou Mapbox auparavant.

**Approche :** Plusieurs heures de lecture de la documentation officielle React (Hooks, state, props) et de `react-map-gl`. Des tutoriels YouTube sur les applications de carte avec React ont également été utilisés.

**Résultat :** La courbe d'apprentissage a pris environ une semaine, décalant légèrement le calendrier.

#### Gestion des variables d'environnement

**Problème :** Les tokens Mapbox et l'URL MongoDB doivent rester secrets mais sont nécessaires en développement.

**Solution :** Utilisation de fichiers `.env` non versionnés (ajoutés au `.gitignore`). Les variables sont exposées côté client React via le préfixe `VITE_` et côté serveur via `dotenv`.

#### Performance de la page équipes

**Problème :** La page `bb_teams.html` contient 30 équipes avec des images en haute résolution, ce qui ralentit le chargement initial.

**Solution partielle :** L'attribut `loading="lazy"` est utilisé sur les images pour différer leur chargement. Une génération dynamique depuis la base de données reste une amélioration à implémenter.

### 3.4 État du projet

#### Fonctionnalités complètes

- ✅ Page d'accueil avec navigation responsive
- ✅ Agrégateur d'actualités NBA (RSS dynamique)
- ✅ Encyclopédie des 30 équipes NBA
- ✅ Inscription avec validation en temps réel
- ✅ Connexion avec vérification bcrypt
- ✅ API REST (Express) pour utilisateurs et pins
- ✅ Base de données MongoDB (modèles User + Pin)
- ✅ Module carte interactif (Mapbox + React)
- ✅ Ajout et consultation de pins de terrains

#### Fonctionnalités incomplètes / défauts connus

- ⏳ **Forum** : Structure HTML présente en page d'accueil, mais non fonctionnel (pas de back-end)
- ⚠️ **Connexion front/back sur le site principal** : Les pages `login.html` et `register.html` ont les formulaires prêts, mais la redirection post-connexion et la gestion de session (JWT ou cookie) ne sont pas finalisées
- ⚠️ **Page équipes** : Générée en HTML statique plutôt que dynamiquement depuis une base de données
- ⚠️ **Mode sombre** : Prévu mais non implémenté

#### Améliorations proposées

1. **Gestion des sessions** : Implémenter JWT pour maintenir la session utilisateur entre les pages
2. **Génération dynamique des équipes** : Stocker les données en MongoDB et les servir via l'API
3. **Proxy RSS back-end** : Créer un endpoint `/api/news` pour éviter la dépendance à `corsproxy.io`
4. **Forum** : Implémenter les modèles Post/Comment et les routes correspondantes
5. **Tests** : Ajouter des tests unitaires (Jest) sur les routes API

#### Licence

Le code source du projet est publié sous licence **MIT**. Les images de joueurs et logos NBA sont la propriété de la NBA et de leurs équipes respectives — leur usage est éducatif et non commercial.

#### Accessibilité et bonnes pratiques numériques

- **Attributs `alt`** sur toutes les images (descriptions pertinentes)
- **Navigation clavier** : Liens et boutons accessibles via tabulation
- **Contraste** : Couleurs choisies pour respecter un ratio de contraste WCAG AA (texte blanc sur fond sombre)
- **HTML sémantique** : Utilisation de `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` pour faciliter la navigation aux lecteurs d'écran
- **Organisation du code** : Dossiers nommés explicitement, fichiers CSS distincts par section, commentaires dans le code JavaScript
- **Chargement différé** : `loading="lazy"` sur les images non critiques

---

## 4. Mise en production

### Configuration locale (pour faire tourner le projet)

Le projet est conçu pour tourner en local. Voici les étapes pour le lancer :

**1. Back-end API (map_bb/backend_map) :**

```bash
cd map_bb/backend_map
npm install
# Créer un fichier .env avec : Mongo_Url=<votre_url_mongodb>
node index.js
# Ou : npx nodemon index.js (pour le développement)
# Serveur disponible sur http://localhost:3000
```

**2. Front-end carte (map_bb/frontend_map) :**

```bash
cd map_bb/frontend_map
npm install
# Créer un fichier .env avec : VITE_MAPBOX=<votre_token_mapbox>
npm run dev
# Application disponible sur http://localhost:5173
```

**3. Site principal :** Ouvrir `bb_menu.html` directement dans un navigateur (ou via Live Server sous VS Code).

### Hébergement en ligne (théorique)

Pour héberger le projet en production, plusieurs étapes seraient nécessaires :

**Back-end (Node.js/Express) :**
- Déploiement sur une plateforme comme **Railway**, **Render** ou **Heroku**
- Configuration des variables d'environnement sur la plateforme (MongoDB URL, secrets)
- Obtention d'un nom de domaine et configuration HTTPS (certificat SSL via Let's Encrypt)

**Front-end React (carte) :**
- Build de production : `npm run build` (génère un dossier `dist/`)
- Déploiement sur **Vercel**, **Netlify** ou en servant les fichiers statiques depuis le même serveur Express
- Mise à jour de l'URL de l'API dans le front-end (variable `VITE_API_URL`)

**Site principal (pages HTML statiques) :**
- Hébergeable sur un CDN statique (Netlify, GitHub Pages) ou servi par Express comme fichiers statiques

**Questions soulevées par l'hébergement :**
- Sécurité : Mise en place de rate-limiting sur l'API pour éviter les abus
- CORS : Restreindre les origines autorisées à l'URL de production uniquement
- Base de données : MongoDB Atlas est déjà cloud-hosted, mais les règles d'accès IP doivent être configurées
- Coûts : Les tiers gratuits des plateformes peuvent avoir des limitations (mise en veille, bande passante)

---

## 5. Conclusion et bilan réflexif

### État global du projet

Le projet **Buzzer Beater** est fonctionnel dans ses fonctionnalités principales : le site présente une interface soignée, un contenu dynamique (actualités RSS, carte interactive), une API REST opérationnelle et une base de données connectée. Les fonctionnalités secondaires (forum, mode sombre) n'ont pas pu être finalisées dans le délai imparti, principalement en raison du temps consacré à l'apprentissage de nouvelles technologies.

L'architecture est saine et évolutive : la séparation front/back est claire, les modèles de données sont bien définis, et le code est organisé en dossiers logiques.

### Bilan personnel — Yanis

Ce projet m'a permis de franchir une étape importante dans ma progression en développement web. L'apprentissage de Node.js et Express a été enrichissant : j'ai compris les mécaniques d'une API REST, la gestion des routes, des middlewares et de l'authentification. Travailler avec MongoDB m'a également donné une première expérience avec les bases de données NoSQL, très différentes des bases relationnelles.

La partie qui m'a le plus apporté est le module carte : React m'a obligé à penser différemment (composants, état, cycle de vie) et Mapbox m'a ouvert à l'intégration d'APIs tierces complexes. La frustration initiale face aux concepts inconnus a laissé place à une vraie satisfaction quand le premier pin est apparu sur la carte.

Ce module m'a motivé à continuer dans la voie du développement web full-stack.

### Bilan personnel — Christopher

Ce projet a été ma première expérience de développement web sur un projet de cette envergure. J'ai particulièrement progressé en CSS avancé (variables, glassmorphism, responsive design avec media queries) et en JavaScript côté client (manipulation du DOM, parsing XML, validation de formulaires).

J'ai également mieux compris l'importance de l'organisation du code et de la communication au sein d'une équipe. L'utilisation de Git en binôme, avec la gestion des conflits de merge, est une compétence que je n'aurais pas développée seul.

Si je refaisais le projet, je commencerais par établir une maquette plus précise et un cahier des charges plus rigoureux, pour éviter les allers-retours sur le design en fin de projet.

### Réflexion sur l'usage de l'IA

Des outils d'IA (principalement **Claude** et **ChatGPT**) ont été utilisés dans le cadre du projet, avec une approche réfléchie :

**Ce qui a bien fonctionné :**
- Débogage rapide : expliquer un message d'erreur incompréhensible et obtenir des pistes de solution
- Génération de contenu textuel (descriptions des équipes NBA) : gain de temps significatif sur le contenu répétitif
- Exploration de la documentation : l'IA a souvent résumé plus efficacement une documentation qu'une lecture exhaustive
- Aide à la syntaxe pour des technologies nouvelles (React, Mongoose)

**Ce qui n'a pas bien fonctionné / limites observées :**
- Le code généré n'était pas toujours adapté à notre architecture spécifique ; il fallait le comprendre et l'adapter, non le copier-coller aveuglément
- Sur des problèmes complexes de CORS ou de configuration Mapbox, l'IA proposait parfois des solutions incorrectes ou obsolètes
- Le risque de "se laisser porter" par l'IA sans vraiment comprendre le code a été conscientisé et évité autant que possible

**Réflexion globale :** L'IA est un accélérateur, pas un remplaçant. Elle est particulièrement utile pour les tâches répétitives ou pour explorer rapidement un nouvel outil. Mais elle ne remplace pas la compréhension : un code IA non compris est une bombe à retardement dans un projet. Nous avons veillé à toujours comprendre ce que nous intégrions.

---

## 6. Annexes

### Annexe A — Bibliographie et ressources utilisées

| Ressource | Usage |
|-----------|-------|
| [Documentation MDN Web Docs](https://developer.mozilla.org) | Référence HTML/CSS/JS |
| [Documentation Express.js](https://expressjs.com) | Routes, middlewares |
| [Documentation Mongoose](https://mongoosejs.com/docs) | Modèles MongoDB |
| [Documentation React](https://react.dev) | Composants, Hooks |
| [Documentation react-map-gl](https://visgl.github.io/react-map-gl/) | Intégration Mapbox |
| [Documentation Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) | API cartographique |
| [corsproxy.io](https://corsproxy.io) | Proxy CORS pour le flux RSS |
| API RSS RMC Sport | Actualités NBA |
| Font Awesome | Icônes |
| MongoDB Atlas | Hébergement base de données |

### Annexe B — Extraits de code notables

#### Parsing du flux RSS (JavaScript vanilla)

```javascript
async function fetchNBANews() {
  const rssUrl = 'https://rmcsport.bfmtv.com/rss/basket/nba/';
  const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(rssUrl)}`;

  const response = await fetch(proxyUrl);
  const text = await response.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'application/xml');
  const items = xml.querySelectorAll('item');

  return Array.from(items).map(item => ({
    title: item.querySelector('title')?.textContent,
    description: item.querySelector('description')?.textContent,
    link: item.querySelector('link')?.textContent,
    pubDate: item.querySelector('pubDate')?.textContent,
    image: item.querySelector('enclosure')?.getAttribute('url')
  }));
}
```

#### Route d'inscription back-end (Express + bcrypt)

```javascript
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});
```

#### Validation d'email en temps réel (JavaScript)

```javascript
emailInput.addEventListener('input', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(emailInput.value);
  emailIndicator.textContent = isValid ? '✓' : '✗';
  emailIndicator.style.color = isValid ? '#4CAF50' : '#f44336';
});
```

### Annexe C — Lien vers le dépôt Git

Le code source est disponible sur GitHub : `https://github.com/Yanis-LM5/Buzzer_Beater`

---

*Compte rendu rédigé dans le cadre du module APP3 — Programmation Web, 2025-2026.*
