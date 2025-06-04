# API Backend NestJS GraphQL

Ce projet est une API backend construite avec NestJS et GraphQL, permettant de gérer une base de données de personnes et leurs animaux.

## Fonctionnalités

- Gestion CRUD des personnes et des animaux
- Requêtes GraphQL pour :
  - Lister toutes les personnes/animaux avec pagination
  - Trouver une personne/animal par ID
  - Créer une nouvelle personne/animal
  - Mettre à jour une personne/animal existante
  - Supprimer une personne/un animal
- Requêtes spéciales :

  - Trouver les personnes possédant le plus d'animaux:
  Les personnes ayant le plus d'animaux sont Sophia Brown (id: 18), Michael Taylor (id: 208) et Sarah White (id: 268) qui ont chacun 6 animaux.

  - Trouver les personnes possédant le plus de chats:
  La personne ayant le plus de chats est Sarah White (id: 268) qui en possède 4.

  - Trouver les personnes ayant le groupe d'animaux le plus lourd
  Sophia Brown (id: 18) a le groupe d'animaux le plus lourd, à 172152g.

  - Trouver l'animal le plus vieux:
  L'animal le plus vieux est Rocky (ID: 934), un lapin né le 20-09-2009.

  - Trouver l'espèce animale la plus représentée:
  L'espèce animale la plus représentée est "Bird" qui apparaît 179 fois

  - Trouver l'animal le plus lourd et son propriétaire:
  L'animal le plus lourd est Chloe, un caniche de 49937g qui appartient à Emma Smith (id: 209)



## Prérequis

- Node.js
- npm ou yarn

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
cd [NOM_DU_REPO]
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn install
```

3. Configurer les variables d'environnement :
Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```env
DB_HOST= "tramway.proxy.rlwy.net"
DB_NAME= "railway"
DB_USER= "root"
DB_PASSWORD= "eYNyEnnjNLOuwxjaeXkCvQloznJfhYsZ"
DB_PORT= "34997"
```

4. Lancer les migrations de la base de données :
```bash
npm run migration:run
# ou
yarn migration:run
```

## Démarrage

Pour lancer l'application en mode développement :
```bash
npm run start:dev
# ou
yarn start:dev
```

L'API sera accessible à l'adresse : `http://localhost:3000/graphql`

## Structure du Projet

```
src/
├── animals/
│   ├── dto/
│   ├── animals.entity.ts
│   ├── animals.service.ts
│   ├── animals.resolver.ts
│   ├── animals.module.ts
│   ├── animals.resolver.spec.ts
│   └── animals.service.spec.ts
├── persons/
│   ├── dto/
│   ├── persons.entity.ts
│   ├── persons.service.ts
│   ├── persons.resolver.ts
│   ├── persons.module.ts
│   ├── persons.resolver.spec.ts
│   └── persons.service.spec.ts
├── common/
│   └── pagination.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
├── app.controller.spec.ts
├── main.ts
└── schema.gql
```

## Exemple de Requêtes GraphQL

### Lister les personnes
```graphql
query {
  findAll(limit: 10, offset: 0) {
    items {
      id
      firstName
      lastName
      animals {
        id
        name
        species
        weight
      }
    }
    totalCount
  }
}
```

## Tests

Pour exécuter les tests :
```bash
npm run test
# ou
yarn test
```

