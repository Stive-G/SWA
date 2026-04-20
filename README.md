# Smart Wardrobe Assistant

## Réalisation du projet

Ce projet a été réalisé en solo yolo.

## Installation

```bash
npm install
```

## Lancer le projet

### Lancer le serveur

Dans un premier terminal:

```bash
npx run server
```

### Lancer l’application mobile avec Expo

Dans un deuxième terminal:

```bash
npx expo start
```

## Variables importantes

`API_BASE_URL` doit utiliser l’adresse IP de l’ordinateur si l’application est testée sur un téléphone physique.

Exemple:

```env
API_BASE_URL=http://192.168.1.1:3000
```

## Technologies ajoutées

### MongoDB avec Mongoose

Au lieu de stocker uniquement les vêtements en local, les vêtements sont sauvegardés dans une base de données MongoDB.

Mongoose est utilisé pour définir le modèle d'un vêtement et communiquer avec MongoDB.

### Cloudinary

Cloudinary a été ajouté pour stocker les photos des vêtements.

Quand l'utilisateur ajoute une photo depuis son téléphone, l'image est envoyée au serveur, puis stockée sur Cloudinary.

### Upload d'image avec Multer

Multer est utilisé côté serveur pour recevoir les fichiers images envoyés par l'application mobile.

## Améliorations possibles

Plusieurs améliorations peuvent être ajoutées à l’application :

- améliorer le design
- ajouter une authentification utilisateur
- permettre à chaque utilisateur d’avoir sa propre armoire
- ajouter plus de catégories de vêtements
- ajouter un système de favoris
- générer plusieurs propositions de tenues
- prendre en compte les préférences de style de l’utilisateur
- ajouter un historique des tenues recommandées
- améliorer la gestion des erreurs serveur
- ajouter des tests
- publier l’application
