# challenge_vue_front

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


Liste de toutes les fonctionnalités du projet 

Recherche des Produits:
Nous proposons un système de recherche avancée permettant de retrouver nos produits par titres et catégories. Contributeurs : Nicolas Frouin, Yves.
Recherche Facettée:
Notre fonctionnalité de recherche avancée permet aux utilisateurs de filtrer les produits par nom, catégorie et prix. La gestion des stocks est automatisée : en cas de demande simultanée d’un produit en stock unique, la commande est attribuée à la première personne à finaliser l'achat. Les autres utilisateurs seront informés de l’indisponibilité du produit, cela arrêtera net l’achat de la seconde personne. Contributeurs : Nicolas Frouin, Quentin Paravano, Yves.
Historique de Commande:
Les utilisateurs peuvent consulter leur historique de commandes. Les administrateurs ont accès à l’historique global des commandes, avec identification des utilisateurs ayant passé commande. Contributeur : Nicolas Frouin.
Gestion des Produits:
Les administrateurs peuvent ajouter, créer et supprimer des produits directement depuis le tableau de bord. Contributeurs : Nicolas Frouin, Nicolas Maire,Quentin
Gestion des Comptes Utilisateurs:
Les administrateurs peuvent supprimer les comptes utilisateurs depuis le tableau de bord. Contributeur : Nicolas Frouin, Quentin Paravano
Tableau de Bord Administratif
Le tableau de bord administratif est personnalisable avec des widgets disposés à souhait. Les données sont mises à jour en temps réel lors des commandes, permettant une visualisation de l’évolution des stocks. Contributeurs : Yves (design), Quentin Paravano (chartes et widgets).
Gestion des Données Utilisateurs:
Lors de la suppression des comptes utilisateurs, les informations relatives aux commandes sont conservées pendant trois ans, conformément aux règles RGPD, comme précisé dans notre politique de collecte de données. Contributeurs : Nicolas Frouin, Nicolas Maire.
Rôles Utilisateurs:
Notre système comporte deux rôles principaux : administrateur et utilisateur. Contributeurs : Yves, Nicolas Maire.
Gestion des Cookies:
Nous utilisons des cookies en conformité avec la RGPD pour obtenir le consentement des utilisateurs avant la collecte de données nécessaires à l'accès au site. Contributeur : Yves.
Développement et Design du Site Web:
Nous avons réalisé plusieurs pages du site web, incluant les modifications front-end et les pages RGPD (CGU, CGV, Politique de confidentialité), ainsi que les pages de vue panier, checkout, et login, pour une meilleure présentation. Le footer du site a également été réalisé. Contributeurs : Yves, Nicolas Maire.
Aspects Juridiques:
La gestion des aspects juridiques du produit a été réalisée par Nicolas Maire et Nicolas Frouin.

